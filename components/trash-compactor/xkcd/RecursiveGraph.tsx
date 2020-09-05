// import * as globalMouseHandler from 'modules/globalMouseHandler'
import _ from 'lodash'
import React from 'react'
import { useIntervalForever } from '../../../lib/useIntervalForever'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { ZenLink } from '../../shared/ZenLink'
import { RecursiveGraphGraph } from './RecursiveGraphGraph'

export const RecursiveGraphFull = () => {
  return (
    <Layout title='Recursive Graph'>
      <Abstract>
        Self-referencing graph. Idea shamelessly stolen from XKCD. Originally
        part of the Trash-Compactor collection.
        <SeeLink href='https://xkcd.com/688/' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/recursive-graph-zen' />

      <ClientOnly>
        <RecursiveGraph />
      </ClientOnly>
    </Layout>
  )
}
const width = 900
const height = 300

function calcBlacknessAndWhitenessFromContext(
  ctx: any,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  // Analyze
  // See: http://stackoverflow.com/questions/667045/getpixel-from-html-canvas
  // Get the CanvasPixelArray from the given coordinates and dimensions.
  let imgd = ctx.getImageData(x, y, w, h)
  let pix = imgd.data
  return calcBlacknessAndWhitenessFromPix(pix)
}
function calcBlacknessAndWhitenessFromPix(pix: any) {
  let totalBlack = 0
  let totalWhite = 0
  for (let i = 0, n = pix.length; i < n; i += 4) {
    let r = pix[i]
    let g = pix[i + 1]
    let b = pix[i + 2]
    // i+3 is alpha (the fourth element)

    let total = r + g + b
    let whiteness = total / (255 * 3)
    let blackness = 1 - whiteness

    totalBlack += blackness
    totalWhite += whiteness
  }

  return [totalBlack, totalWhite]
}

export const RecursiveGraph = () => {
  let [elapsed, iteration] = useIntervalForever(200)

  let [state, setState] = React.useState({
    // raf: null,
    white: 1.0,
    black: 0.0,
    panel1: 0.5,
    panel2: 0.5,
    panel3: 0.5,
    inverted: false,
    mouseX: 0,
    mouseY: 0,
    mouseActive: false,
  })

  const mergeState = (newState: any) => {
    setState(_.merge({}, state, newState))
  }

  let _ref_canvas = React.useRef<HTMLCanvasElement>(null)
  let _ref_svg = React.useRef<SVGSVGElement>(null)
  let _ref_img = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    const _update = () => {
      let { black, white, panel1, panel2, panel3, inverted } = state

      if (_ref_canvas.current && _ref_svg.current && _ref_img.current) {
        // // To canvas, so we can analyize the pixels
        // var c = document.getElementById('canvas');
        // var jqc = $("#canvas");

        // var cw = margin.left + width + margin.right;
        // var ch = margin.top + height + margin.bottom;
        // jqc.prop({ width: cw, height: ch })
        // jqc.width(cw);
        // jqc.height(ch);

        // Grab the raw canvas so we can get the raw pixels. Sorry old browsers
        let ctx = _ref_canvas.current?.getContext('2d')

        if (iteration % 3 === 1) {
          // get svg data
          let xml = new XMLSerializer().serializeToString(_ref_svg.current)

          // make it base64
          let svg64 = btoa(xml)
          let b64Start = 'data:image/svg+xml;base64,'

          // prepend a "header"
          let image64 = b64Start + svg64

          // set it as the source of the img element
          _ref_img.current.src = image64
        }

        if (iteration % 3 === 2) {
          let results = calcBlacknessAndWhitenessFromContext(
            ctx,
            0,
            0,
            width,
            height,
          )
          let resultsPanel1 = calcBlacknessAndWhitenessFromContext(
            ctx,
            (width / 3) * 0,
            0,
            width / 3,
            height,
          )
          let resultsPanel2 = calcBlacknessAndWhitenessFromContext(
            ctx,
            (width / 3) * 1,
            0,
            width / 3,
            height,
          )
          let resultsPanel3 = calcBlacknessAndWhitenessFromContext(
            ctx,
            (width / 3) * 2,
            0,
            width / 3,
            height,
          )

          panel1 = resultsPanel1[0] / (resultsPanel1[0] + resultsPanel1[1])
          panel2 = resultsPanel2[0] / (resultsPanel2[0] + resultsPanel2[1])
          panel3 = resultsPanel3[0] / (resultsPanel3[0] + resultsPanel3[1])

          black = results[0]
          white = results[1]
        }
      }

      // if (iteration < 100) {
      mergeState({
        panel1,
        panel2,
        panel3,
        black,
        white,

        inverted,
        // raf: requestAnimationFrame(this._update),
      })
      // }
    }

    _update()
  }, [iteration])

  const _on_invert = () => {
    mergeState({
      inverted: !state.inverted,
      iteration: 0,
      // raf: requestAnimationFrame(this._update),
    })
  }

  const _on_mouse_move = (ev: any) => {
    if (_ref_svg.current) {
      let pt = _ref_svg.current.createSVGPoint()
      pt.x = ev.clientX
      pt.y = ev.clientY

      let cursorPt = pt.matrixTransform(
        _ref_svg.current.getScreenCTM()?.inverse(),
      )
      // logger.x('move', cursorPt)

      mergeState({
        // iteration: 0,
        mouseX: cursorPt.x,
        mouseY: cursorPt.y,
        // raf: requestAnimationFrame(this._update),
      })
    }
  }

  const _on_mouse_enter = () => {
    mergeState({
      // iteration: 0,
      mouseActive: true,
      // raf: requestAnimationFrame(this._update),
    })
  }

  const _on_mouse_leave = () => {
    mergeState({
      // iteration: 0,
      mouseActive: false,
      // raf: requestAnimationFrame(this._update),
    })
  }

  const _on_img_loaded_data = () => {
    // logger.x('image loaded data')
    // Draw onto canvas
    if (_ref_canvas.current && _ref_img.current) {
      let ctx = _ref_canvas.current.getContext('2d')
      ctx?.drawImage(_ref_img.current, 0, 0)
    }
  }

  let {
    black,
    white,
    panel1,
    panel2,
    panel3,
    inverted,
    mouseX,
    mouseY,
    mouseActive,
  } = state

  const turn = Math.PI * 2

  // see: https://github.com/d3/d3-shape/blob/master/README.md#pie
  let data = [black, white]

  let panels = [0, 1, 2]
  let panelPadding = 10
  let panelWidth = (width - panelPadding * 4) / 3
  let panelHeight = height - panelPadding * 2

  let panelData = [panel1, panel2, panel3]

  let barGraphPadding = 30

  let recursionScale = (panelWidth / width) * 0.93

  let normal = !inverted

  return (
    <div>
      {/* <div>
        Recursive graph {iteration} {elapsed}
        <br />
        Based on
      </div>

      <div>
        <div>% black: {black}</div>
        <div>% white: {white}</div>
        <div>
          {panel1}, {panel2}, {panel3}
        </div>
        <div>Inverted? {'' + inverted}</div>
      </div> */}

      <div>
        <button onClick={_on_invert}>Invert Graph</button>
      </div>

      <svg
        width={width}
        height={height}
        ref={_ref_svg}
        onMouseMove={_on_mouse_move}
        onMouseEnter={_on_mouse_enter}
        onMouseLeave={_on_mouse_leave}
      >
        <g>
          <RecursiveGraphGraph
            width={width}
            height={height}
            black={black}
            white={white}
            panel1={panel1}
            panel2={panel2}
            panel3={panel3}
            recursionNumber={1}
            inverted={inverted}
            mouseX={mouseX}
            mouseY={mouseY}
            mouseActive={mouseActive}
          />
        </g>
      </svg>

      <div style={{ display: 'none' }}>
        <br />
        <canvas ref={_ref_canvas} width={width} height={height}></canvas>
        <br />
        <img ref={_ref_img} onLoad={_on_img_loaded_data} />
      </div>

      {/* <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
          <pre>
            {JSON.stringify(arcs, null, 2)}
          </pre>
          <pre>
            {JSON.stringify(arcPaths, null, 2)}
          </pre> */}
    </div>
  )
}
