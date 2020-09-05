// Tiny Sprite Sheet Generator - Frank Force 2020 - MIT License
// Reformatted

export function tinySprite_render(
  seed: number,
  ctx: CanvasRenderingContext2D,
  maxPass: number,
  maxProgress: number,
) {
  let k = 0
  let minorSeed = 0

  let idx = 0

  ctx.lineWidth = 2 // set 2 pixel wide line width to make the black outline
  const R = () => ((Math.sin(++minorSeed + idx * idx) + 1) * 1e9) % 256 | 0 // get a seeded random integer between 0-256

  let numWidth = 5
  let numHeight = 5
  let size = 16

  // for each sprite
  for (let j = 0; j < numHeight; j++)
    for (let i = 0; i < numWidth; i++) {
      // 2 passes, outline left/right and fill left/right
      for (let pass = 0; pass < 2 && pass < maxPass; pass++) {
        idx = i + j * numWidth
        // set seed, randomize max sprite pixels, 50-101
        minorSeed = seed

        k = (R() / 5 + 50) | 0
        // cool effect:
        // if (k > maxProgress) {
        //   k = maxProgress
        // }

        let runs = maxProgress
        for (; k > 0 && runs > 0; ) {
          k--
          runs--
          // X & Y pixel index in sprite
          //let X = (size - k) & 7
          //let X = 7 - (k & 7)
          let X0 = k & 7
          let X = 7 - (k & 7) // 0-7
          // let X2 = 7 - X
          console.log(k & 7, k)
          let Y = k >> 3

          // small chance of new color
          if (R() < 19) {
            // randomize color
            ctx.fillStyle = `rgb(${R()},${R()},${R()})`
          } else {
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
