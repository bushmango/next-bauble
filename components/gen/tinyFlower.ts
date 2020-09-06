// Based on Tiny Sprite Sheet Generator - Frank Force 2020 - MIT License
// Reformatted

import chroma from 'chroma-js'
const colors = chroma.scale(['773421', 'a58c27', '39571c']).mode('lab')

export function tinyFlower_render(
  seed: number,
  ctx: CanvasRenderingContext2D,
  maxPass: number,
  maxProgress: number,
) {
  let minorSeed = 0

  let idx = 0

  ctx.lineWidth = 2 // set 2 pixel wide line width to make the black outline
  const R = () => ((Math.sin(++minorSeed + idx * idx) + 1) * 1e9) % 256 | 0 // get a seeded random integer between 0-256

  let numWidth = 5
  let numHeight = 5
  let size = 16

  // Init colors
  let t = R() / 255
  let color = colors(t).brighten(1).css()
  let color2 = colors(t).darken(1).css()
  ctx.fillStyle = color // `rgb(${R()},${R()},${R()})`
  ctx.strokeStyle = color2

  // for each sprite
  for (let j = 0; j < numHeight; j++)
    for (let i = 0; i < numWidth; i++) {
      // 2 passes, outline left/right and fill left/right
      for (let pass = 0; pass < 2 && pass < maxPass; pass++) {
        idx = i + j * numWidth
        minorSeed = seed

        let minPixels = 20
        let additionalPixels = 20
        let numPixels = minPixels + Math.floor((R() / 255) * additionalPixels)

        let runs = maxProgress
        for (; numPixels > 0 && runs > 0; ) {
          numPixels--
          runs--
          // X & Y pixel index in sprite
          let X = 7 - (numPixels & 7) // 0-7
          let Y = 2 + Math.floor(numPixels * 0.1 - X / 2)

          // small chance of new color
          if (R() < 19) {
            // randomize color
            let t = R() / 255
            let color = colors(t).brighten(1).css()
            let color2 = colors(t).darken(1).css()
            ctx.fillStyle = color // `rgb(${R()},${R()},${R()})`
            ctx.strokeStyle = color2
          }
          // distance from center vs random number
          if (R() ** 2 / 2e3 > X * X + (Y - 5) ** 2) {
            // x pos, flipped if pass is even
            let px = 7 + i * size + size / 2
            let px1 = px - X
            let px2 = px + X
            let py = 2 + Y + j * size + size / 2

            // stroke first for outline then fill with color
            if (pass === 0) {
              ctx.strokeRect(px1, py, 1, 1)
              ctx.strokeRect(px2, py, 1, 1)
            } else {
              ctx.fillRect(px1, py, 1, 1)
              ctx.fillRect(px2, py, 1, 1)
            }
          }
        }
      }
    }
}

// // Tiny Sprite Sheet Generator - Frank Force 2020 - MIT License

// 'use strict'
// let seed, x, R, i, j, pass, s, X, Y;

// seed = Date.now();    // seed for random generaton, can be replaced with hardcoded value
// x = c.getContext`2d`; // 2d canvas context
// x.lineWidth = 2;      // set 2 pixel wide line width to make the black outline
// R = ()=> (Math.sin(++s + i*i) + 1)*1e9 % 256 | 0; // get a seeded random integer between 0-256

// for(i = 32 * 16; i--;)                          // for each sprite (32 rows x 16 columns)
// for(pass = 4; pass--;)                          // 4 passes, outline left/right and fill left/right
// for(s = seed, j = R()/5 + 50|0; j--;)           // set seed, randomize max sprite pixels, 50-101
//   X = j&7, Y = j>>3,                            // X & Y pixel index in sprite
//   R() < 19 ?                                    // small chance of new color
//     x.fillStyle = `rgb(${R()},${R()},${R()})` : // randomize color
//     R()**2 / 2e3 > X*X + (Y-5)**2 &&            // distance from center vs random number
//       x[pass&2 ? 'strokeRect' : 'fillRect'](    // stroke first for outline then fill with color
//           7 + i%32*16 - pass%2*2*X + X,         // x pos, flipped if pass is even
//           2 + (i>>5)*16 + Y,                    // y pos
//           1, 1);                                // 1 pixel size
