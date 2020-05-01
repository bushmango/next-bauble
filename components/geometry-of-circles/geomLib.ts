// see: https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
export function rotate(
  cx: number,
  cy: number,
  x: number,
  y: number,
  angle: number,
): [number, number] {
  let radians = angle
  let cos = Math.cos(radians)
  let sin = Math.sin(radians)
  let nx = cos * x + sin * y + cx
  let ny = cos * y - sin * x + cy
  return [nx, ny]
}

export function rotate2(
  cx: number,
  cy: number,
  x: number,
  y: number,
  angle: number,
): [number, number] {
  let radians = -angle
  let cos = Math.cos(radians)
  let sin = Math.sin(radians)
  let nx = cos * (x - cx) + sin * (y - cy) + cx
  let ny = cos * (y - cy) - sin * (x - cx) + cy
  return [nx, ny]
}
