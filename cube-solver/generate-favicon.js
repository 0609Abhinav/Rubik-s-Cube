/**
 * Generates a 32x32 ICO file with a Rubik's cube icon.
 * Run: node generate-favicon.js
 * Output: public/favicon.ico
 */
const fs = require('fs');
const path = require('path');

const SIZE = 32;

// Sticker colors (RGB) for 3x3 grid
const COLORS = [
  [239, 68,  68],  // red
  [249, 115, 22],  // orange
  [251, 191, 36],  // yellow
  [34,  197, 94],  // green
  [139, 92,  246], // violet (center)
  [59,  130, 246], // blue
  [248, 248, 242], // white
  [16,  185, 129], // emerald
  [244, 63,  94],  // rose
];

// Background color
const BG = [5, 5, 13];
// Border/gap color (dark)
const GAP = [20, 10, 40];

function createPixels() {
  const pixels = new Array(SIZE * SIZE).fill(null).map(() => [...BG]);

  // Draw rounded rect background with subtle border
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const r = 5; // corner radius
      const inCorner = (
        (x < r && y < r && Math.sqrt((x-r)**2 + (y-r)**2) > r) ||
        (x >= SIZE-r && y < r && Math.sqrt((x-(SIZE-r-1))**2 + (y-r)**2) > r) ||
        (x < r && y >= SIZE-r && Math.sqrt((x-r)**2 + (y-(SIZE-r-1))**2) > r) ||
        (x >= SIZE-r && y >= SIZE-r && Math.sqrt((x-(SIZE-r-1))**2 + (y-(SIZE-r-1))**2) > r)
      );
      if (inCorner) pixels[y * SIZE + x] = null; // transparent
    }
  }

  // 3x3 sticker grid
  // Each sticker: ~8px with 1px gap, starting at x=2, y=2
  const STICKER = 8;
  const GAP_SIZE = 1;
  const PADDING = 2;
  const CORNER_R = 2;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const color = COLORS[row * 3 + col];
      const sx = PADDING + col * (STICKER + GAP_SIZE);
      const sy = PADDING + row * (STICKER + GAP_SIZE);

      for (let py = 0; py < STICKER; py++) {
        for (let px = 0; px < STICKER; px++) {
          // Rounded corners on sticker
          const inCorner = (
            (px < CORNER_R && py < CORNER_R && Math.sqrt((px-CORNER_R)**2 + (py-CORNER_R)**2) > CORNER_R) ||
            (px >= STICKER-CORNER_R && py < CORNER_R && Math.sqrt((px-(STICKER-CORNER_R-1))**2 + (py-CORNER_R)**2) > CORNER_R) ||
            (px < CORNER_R && py >= STICKER-CORNER_R && Math.sqrt((px-CORNER_R)**2 + (py-(STICKER-CORNER_R-1))**2) > CORNER_R) ||
            (px >= STICKER-CORNER_R && py >= STICKER-CORNER_R && Math.sqrt((px-(STICKER-CORNER_R-1))**2 + (py-(STICKER-CORNER_R-1))**2) > CORNER_R)
          );
          if (inCorner) continue;

          const gx = sx + px;
          const gy = sy + py;
          if (gx < SIZE && gy < SIZE) {
            // Add highlight gloss on top-left of sticker
            let c = [...color];
            if (px < 3 && py < 2) {
              c = c.map(v => Math.min(255, v + 60));
            }
            pixels[gy * SIZE + gx] = c;
          }
        }
      }
    }
  }

  return pixels;
}

function buildICO(pixels) {
  // ICO format: header + directory + BMP data
  const width = SIZE, height = SIZE;
  const bmpHeaderSize = 40;
  const pixelDataSize = width * height * 4; // BGRA
  const andMaskSize = Math.ceil(width / 8) * height;
  const imageSize = bmpHeaderSize + pixelDataSize + andMaskSize;

  const buf = Buffer.alloc(6 + 16 + imageSize);
  let offset = 0;

  // ICO Header
  buf.writeUInt16LE(0, offset); offset += 2;      // reserved
  buf.writeUInt16LE(1, offset); offset += 2;      // type: 1 = ICO
  buf.writeUInt16LE(1, offset); offset += 2;      // count: 1 image

  // Directory entry
  buf.writeUInt8(width, offset); offset += 1;
  buf.writeUInt8(height, offset); offset += 1;
  buf.writeUInt8(0, offset); offset += 1;         // color count
  buf.writeUInt8(0, offset); offset += 1;         // reserved
  buf.writeUInt16LE(1, offset); offset += 2;      // planes
  buf.writeUInt16LE(32, offset); offset += 2;     // bit count
  buf.writeUInt32LE(imageSize, offset); offset += 4;
  buf.writeUInt32LE(22, offset); offset += 4;     // offset to image data

  // BMP Info Header (BITMAPINFOHEADER)
  buf.writeUInt32LE(bmpHeaderSize, offset); offset += 4;
  buf.writeInt32LE(width, offset); offset += 4;
  buf.writeInt32LE(height * 2, offset); offset += 4; // height*2 for ICO
  buf.writeUInt16LE(1, offset); offset += 2;      // planes
  buf.writeUInt16LE(32, offset); offset += 2;     // bit count
  buf.writeUInt32LE(0, offset); offset += 4;      // compression: none
  buf.writeUInt32LE(pixelDataSize, offset); offset += 4;
  buf.writeInt32LE(0, offset); offset += 4;       // x pixels per meter
  buf.writeInt32LE(0, offset); offset += 4;       // y pixels per meter
  buf.writeUInt32LE(0, offset); offset += 4;      // colors used
  buf.writeUInt32LE(0, offset); offset += 4;      // colors important

  // Pixel data — BMP is bottom-up, BGRA
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const pixel = pixels[y * width + x];
      if (pixel === null) {
        // Transparent
        buf.writeUInt8(0, offset);     // B
        buf.writeUInt8(0, offset + 1); // G
        buf.writeUInt8(0, offset + 2); // R
        buf.writeUInt8(0, offset + 3); // A = 0 (transparent)
      } else {
        buf.writeUInt8(pixel[2], offset);     // B
        buf.writeUInt8(pixel[1], offset + 1); // G
        buf.writeUInt8(pixel[0], offset + 2); // R
        buf.writeUInt8(255, offset + 3);      // A = 255 (opaque)
      }
      offset += 4;
    }
  }

  // AND mask (all zeros = opaque)
  for (let i = 0; i < andMaskSize; i++) {
    buf.writeUInt8(0, offset++);
  }

  return buf;
}

const pixels = createPixels();
const ico = buildICO(pixels);
const outPath = path.join(__dirname, 'public', 'favicon.ico');
fs.writeFileSync(outPath, ico);
console.log(`✅ favicon.ico written to ${outPath} (${ico.length} bytes)`);
