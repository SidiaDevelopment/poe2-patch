// DDS (DX10) loader: zstd-decompress a .dds.zst and parse header into slices.
"use strict";
const fs = require("fs");
const fzstd = require("fzstd");

const DXGI = { 71: "BC1", 74: "BC2", 77: "BC3", 80: "BC4", 83: "BC5", 95: "BC6H", 96: "BC6H", 98: "BC7", 99: "BC7_SRGB" };

function blockBytes(fmt, w, h) {
  const bw = Math.max(1, Math.ceil(w / 4)), bh = Math.max(1, Math.ceil(h / 4));
  const per = (fmt === "BC1" || fmt === "BC4") ? 8 : 16;
  return bw * bh * per;
}

function load(zstPath) {
  const comp = fs.readFileSync(zstPath);
  const ddsBuf = Buffer.from(fzstd.decompress(new Uint8Array(comp)));
  if (ddsBuf.readUInt32LE(0) !== 0x20534444) throw new Error("not a DDS file");
  const height = ddsBuf.readUInt32LE(12);
  const width = ddsBuf.readUInt32LE(16);
  let mipCount = ddsBuf.readUInt32LE(28) || 1;
  const fourCC = ddsBuf.toString("ascii", 84, 88);
  let headerSize = 128, arraySize = 1, format;
  if (fourCC === "DX10") {
    const dxgi = ddsBuf.readUInt32LE(128);
    format = DXGI[dxgi] || ("DXGI" + dxgi);
    arraySize = ddsBuf.readUInt32LE(140) || 1;
    headerSize = 148;
  } else {
    format = fourCC.replace(/\0/g, "");
  }
  const baseFmt = format.replace("_SRGB", "");
  // bytes for one full mip chain (one array slice)
  let sliceBytes = 0;
  for (let m = 0; m < mipCount; m++) {
    sliceBytes += blockBytes(baseFmt, Math.max(1, width >> m), Math.max(1, height >> m));
  }
  return {
    width, height, mipCount, arraySize, format: baseFmt, srgb: /_SRGB/.test(format),
    headerSize, sliceBytes, data: ddsBuf,
    // raw block bytes for mip 0 of array slice `i`
    slice(i) {
      const off = headerSize + i * sliceBytes;
      const len = blockBytes(baseFmt, width, height);
      return this.data.subarray(off, off + len);
    },
  };
}

module.exports = { load };
