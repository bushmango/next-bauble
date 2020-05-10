import { browser } from './browser-sidecar'

let docX = 0
let docY = 0
let pageX = 0
let pageY = 0
let verbose = false

if (browser.documentExists) {
  browser.getDocument().onmousemove = _onDocumentMouseMove
  browser.getDocument().onmouseover = _onDocumentMouseMove
}

function _onDocumentMouseMove(ev: any) {
  // TODO: extract into module
  docX = ev.clientX
  docY = ev.clientY

  pageX = ev.pageX || ev.clientX + document.body.scrollLeft
  pageY = ev.pageY || ev.clientY + document.body.scrollTop
}

export function getMousePos() {
  return { docX, docY, pageX, pageY }
}

// SVG manipulation
export function createSvgPoint(_ref_svg: any) {
  if (!_ref_svg) {
    return null
  }
  return _ref_svg.createSVGPoint()
}

export function convertToSvgSpace(
  svg: any,
  svgPoint: any,
  x: number,
  y: number,
) {
  if (!svgPoint) {
    return { x, y }
  }
  svgPoint.x = x
  svgPoint.y = y
  let cursorPt = svgPoint.matrixTransform(svg.getScreenCTM().inverse())
  return { x: cursorPt.x, y: cursorPt.y }
}
