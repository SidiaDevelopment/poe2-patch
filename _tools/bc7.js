// BC7 (BPTC unorm) decoder — ported from bcdec.h (iOrange, public domain).
// Decodes a 16-byte BC7 block into a 4x4 RGBA tile, and a full BC7 image into RGBA.
"use strict";
const fs = require("fs");
const path = require("path");

const PART = JSON.parse(fs.readFileSync(path.join(__dirname, "bc7_partitions.json"), "utf8"));
const PARTITION_SETS = [PART.subset2, PART.subset3]; // [numPartitions-2][partition][i][j]

const ACTUAL_BITS = [
  [4, 6, 5, 7, 5, 7, 7, 5], // RGB
  [0, 0, 0, 0, 6, 8, 7, 5], // Alpha
];
const MODE_HAS_PBITS = 0b11001011;
const AW2 = [0, 21, 43, 64];
const AW3 = [0, 9, 18, 27, 37, 46, 55, 64];
const AW4 = [0, 4, 9, 13, 17, 21, 26, 30, 34, 38, 43, 47, 51, 55, 60, 64];

const interp = (a, b, w, idx) => (a * (64 - w[idx]) + b * w[idx] + 32) >> 6;

// Decode one block (Buffer/Uint8Array offset) into `out` RGBA at (px,py) of a
// width*height*4 image buffer.
function decodeBlock(block, off, out, imgW, px, py) {
  // 128-bit register read LSB-first (matches bcdec's lo|hi<<64 from the bottom).
  // All BC7 reads are <= 8 bits, so a byte-cursor reader is exact and fast.
  let bitpos = 0;
  const read = (n) => {
    let v = 0;
    for (let k = 0; k < n; k++) {
      const bit = (block[off + (bitpos >> 3)] >> (bitpos & 7)) & 1;
      v |= bit << k;
      bitpos++;
    }
    return v;
  };

  // mode = number of leading zero bits before the first 1 (max 8)
  let mode = 0;
  while (mode < 8 && read(1) === 0) mode++;
  if (mode >= 8) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        const p = ((py + i) * imgW + (px + j)) * 4;
        out[p] = out[p + 1] = out[p + 2] = out[p + 3] = 0;
      }
    return;
  }

  let partition = 0, numPartitions = 1, rotation = 0, indexSelectionBit = 0;
  if (mode === 0 || mode === 1 || mode === 2 || mode === 3 || mode === 7) {
    numPartitions = (mode === 0 || mode === 2) ? 3 : 2;
    partition = read(mode === 0 ? 4 : 6);
  }
  const numEndpoints = numPartitions * 2;
  if (mode === 4 || mode === 5) {
    rotation = read(2);
    if (mode === 4) indexSelectionBit = read(1);
  }

  // endpoints[6][4]
  const ep = [];
  for (let i = 0; i < 6; i++) ep.push([0, 0, 0, 0]);

  const cbits = ACTUAL_BITS[0][mode];
  const abits = ACTUAL_BITS[1][mode];
  for (let c = 0; c < 3; c++)
    for (let e = 0; e < numEndpoints; e++) ep[e][c] = read(cbits);
  if (abits > 0)
    for (let e = 0; e < numEndpoints; e++) ep[e][3] = read(abits);

  const hasP = (mode === 0 || mode === 1 || mode === 3 || mode === 6 || mode === 7);
  if (hasP) {
    for (let e = 0; e < numEndpoints; e++)
      for (let c = 0; c < 4; c++) ep[e][c] <<= 1;
    if (mode === 1) {
      const i = read(1), j = read(1);
      for (let k = 0; k < 3; k++) {
        ep[0][k] |= i; ep[1][k] |= i; ep[2][k] |= j; ep[3][k] |= j;
      }
    } else if (MODE_HAS_PBITS & (1 << mode)) {
      for (let e = 0; e < numEndpoints; e++) {
        const pb = read(1);
        for (let k = 0; k < 4; k++) ep[e][k] |= pb;
      }
    }
  }

  const pbit = (MODE_HAS_PBITS >> mode) & 1;
  for (let e = 0; e < numEndpoints; e++) {
    let j = cbits + pbit;
    for (let k = 0; k < 3; k++) {
      ep[e][k] = (ep[e][k] << (8 - j)) & 0xff;
      ep[e][k] = ep[e][k] | (ep[e][k] >> j);
    }
    j = abits + pbit;
    if (abits > 0) {
      ep[e][3] = (ep[e][3] << (8 - j)) & 0xff;
      ep[e][3] = ep[e][3] | (ep[e][3] >> j);
    }
  }
  if (!abits) for (let e = 0; e < numEndpoints; e++) ep[e][3] = 0xff;

  let indexBits = (mode === 0 || mode === 1) ? 3 : (mode === 6 ? 4 : 2);
  const indexBits2 = (mode === 4) ? 3 : (mode === 5 ? 2 : 0);
  const weights = indexBits === 2 ? AW2 : (indexBits === 3 ? AW3 : AW4);
  const weights2 = indexBits2 === 2 ? AW2 : AW3;

  // Pass 1: color indices
  const idx = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      let pset = (numPartitions === 1) ? ((i | j) ? 0 : 128) : PARTITION_SETS[numPartitions - 2][partition][i][j];
      let ib = (mode === 0 || mode === 1) ? 3 : (mode === 6 ? 4 : 2);
      if (pset & 0x80) ib--;
      idx[i][j] = read(ib);
    }

  // Pass 2: alpha indices, interpolate, rotate
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let pset = (numPartitions === 1) ? ((i | j) ? 0 : 128) : PARTITION_SETS[numPartitions - 2][partition][i][j];
      pset &= 0x03;
      const index = idx[i][j];
      let r, g, b, a;
      if (!indexBits2) {
        r = interp(ep[pset * 2][0], ep[pset * 2 + 1][0], weights, index);
        g = interp(ep[pset * 2][1], ep[pset * 2 + 1][1], weights, index);
        b = interp(ep[pset * 2][2], ep[pset * 2 + 1][2], weights, index);
        a = interp(ep[pset * 2][3], ep[pset * 2 + 1][3], weights, index);
      } else {
        const index2 = read((i | j) ? indexBits2 : indexBits2 - 1);
        if (!indexSelectionBit) {
          r = interp(ep[pset * 2][0], ep[pset * 2 + 1][0], weights, index);
          g = interp(ep[pset * 2][1], ep[pset * 2 + 1][1], weights, index);
          b = interp(ep[pset * 2][2], ep[pset * 2 + 1][2], weights, index);
          a = interp(ep[pset * 2][3], ep[pset * 2 + 1][3], weights2, index2);
        } else {
          r = interp(ep[pset * 2][0], ep[pset * 2 + 1][0], weights2, index2);
          g = interp(ep[pset * 2][1], ep[pset * 2 + 1][1], weights2, index2);
          b = interp(ep[pset * 2][2], ep[pset * 2 + 1][2], weights2, index2);
          a = interp(ep[pset * 2][3], ep[pset * 2 + 1][3], weights, index);
        }
      }
      if (rotation === 1) { const t = a; a = r; r = t; }
      else if (rotation === 2) { const t = a; a = g; g = t; }
      else if (rotation === 3) { const t = a; a = b; b = t; }

      const p = ((py + i) * imgW + (px + j)) * 4;
      out[p] = r; out[p + 1] = g; out[p + 2] = b; out[p + 3] = a;
    }
  }
}

// Decode a full BC7 image. `data` = raw block bytes (w/4 * h/4 * 16). Returns RGBA Uint8Array.
function decodeImage(data, width, height) {
  const out = new Uint8Array(width * height * 4);
  const bw = width >> 2, bh = height >> 2;
  let off = 0;
  for (let by = 0; by < bh; by++)
    for (let bx = 0; bx < bw; bx++) {
      decodeBlock(data, off, out, width, bx * 4, by * 4);
      off += 16;
    }
  return out;
}

module.exports = { decodeImage, decodeBlock };
