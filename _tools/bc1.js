// BC1 (DXT1) decoder → RGBA. Skill-icon atlases are BC1; bc7.js can't decode
// them. Each 4x4 block is 8 bytes: two RGB565 endpoints + 16×2-bit indices.
// When c0 <= c1, index 3 is transparent (1-bit alpha).
"use strict";

function rgb565(c) {
  const r = (c >> 11) & 0x1f, g = (c >> 5) & 0x3f, b = c & 0x1f;
  return [(r * 527 + 23) >> 6, (g * 259 + 33) >> 6, (b * 527 + 23) >> 6]; // 5/6-bit → 8-bit
}

function decodeImage(blocks, width, height) {
  const out = Buffer.alloc(width * height * 4);
  let p = 0;
  for (let by = 0; by < height; by += 4) {
    for (let bx = 0; bx < width; bx += 4) {
      const c0 = blocks.readUInt16LE(p), c1 = blocks.readUInt16LE(p + 2);
      const bits = blocks.readUInt32LE(p + 4);
      p += 8;
      const C0 = rgb565(c0), C1 = rgb565(c1);
      const pal = [C0, C1, [0, 0, 0], [0, 0, 0]];
      const punch = c0 <= c1;                 // 1-bit-alpha mode
      if (!punch) {
        pal[2] = [(2 * C0[0] + C1[0]) / 3 | 0, (2 * C0[1] + C1[1]) / 3 | 0, (2 * C0[2] + C1[2]) / 3 | 0];
        pal[3] = [(C0[0] + 2 * C1[0]) / 3 | 0, (C0[1] + 2 * C1[1]) / 3 | 0, (C0[2] + 2 * C1[2]) / 3 | 0];
      } else {
        pal[2] = [(C0[0] + C1[0]) / 2 | 0, (C0[1] + C1[1]) / 2 | 0, (C0[2] + C1[2]) / 2 | 0];
        pal[3] = [0, 0, 0];
      }
      for (let py = 0; py < 4; py++) {
        for (let px = 0; px < 4; px++) {
          const x = bx + px, y = by + py;
          if (x >= width || y >= height) continue;
          const idx = (bits >>> (2 * (py * 4 + px))) & 3;
          const col = pal[idx];
          const o = (y * width + x) * 4;
          out[o] = col[0]; out[o + 1] = col[1]; out[o + 2] = col[2];
          out[o + 3] = (punch && idx === 3) ? 0 : 255;
        }
      }
    }
  }
  return out;
}

module.exports = { decodeImage };
