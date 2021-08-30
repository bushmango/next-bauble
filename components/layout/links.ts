// export interface IArtLink {
//   path: string
//   title: string
//   tags: string
// }

export const links: Array<[string, string, string[]]> = [
  ['/', 'Home', ['home']],
  ['/rebreather', 'Rebreather', ['misc']],
  ['/game-of-life-classic', 'Game of Life Classic', ['game-of-life']],
  ['/game-of-life', 'Game of Life Smooth', ['game-of-life']],
  ['/game-of-life-genes', 'Game of Life Genes', ['game-of-life']],
  ['/geometry-of-circles', 'Geometry of Circles', ['geometric']],
  ['/scratch-clock-linear', 'Scratch Clock Linear', ['clock']],
  ['/scratch-clock-radial', 'Scratch Clock Radial', ['clock']],
  ['/penny-farthing-clock', 'Penny-Farthing Clock', ['clock']],
  // ['/scratch-clock-radial-alt', 'Scratch Clock Radial (Alt)'],
  ['/fractal-tree', 'Fractal Tree', ['geometric']],
  ['/koch-snowflake-fractal-1', 'Koch Snowflake 1', ['geometric']],
  ['/koch-snowflake-fractal-2', 'Koch Snowflake 2', ['geometric']],
  ['/koch-snowflake-fractal-3', 'Koch Snowflake 3', ['geometric']],
  ['/boxes-1', 'Boxes 1', ['geometric']],
  ['/boxes-2', 'Boxes 2', ['geometric']],
  ['/boxes-3', 'Boxes 3', ['geometric']],
  ['/d3-pack', 'D3 Pack', ['geometric']],
  ['/d3-pack-eyes', 'D3 Pack Eyes', ['geometric']],
  ['/d3-rounded-rects', 'D3 Rounded Rects', ['geometric']],
  ['/fractal-monkey', 'Fractal Monkey', ['geometric']],
  ['/recursive-graph', 'Recursive Graph', ['misc']],
  ['/cat-sprite', 'Cat Sprite', ['misc']],
  ['/hex', 'Hex', ['geometric']],
  ['/generated-sprites', 'Generated Sprites', ['generated']],
  ['/generated-flowers', 'Generated Flowers', ['generated']],
]

export const categories = [
  ['game-of-life', 'Game of Life'],
  ['clock', 'Clocks'],
  ['generated', 'Generated'],
  ['geometric', 'Geometric'],
  ['misc', 'Mis·cel·la·ny'],
]
