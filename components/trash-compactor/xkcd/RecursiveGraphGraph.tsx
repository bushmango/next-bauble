import * as d3 from 'd3'
import { default as _ } from 'lodash'
// import * as globalMouseHandler from 'modules/globalMouseHandler'
import React from 'react'

export const RecursiveGraphGraph = (props: {
  recursionNumber: number
  black: number
  white: number
  panel1: number
  panel2: number
  panel3: number
  width: number
  height: number
  inverted: boolean
  mouseX: number
  mouseY: number
  mouseActive: boolean
}) => {
  let {
    recursionNumber,
    black,
    white,
    panel1,
    panel2,
    panel3,
    width,
    height,
    inverted,
    mouseX,
    mouseY,
    mouseActive,
  } = props

  // Infinite loop breaker
  if (recursionNumber > 5) {
    return <g></g>
  }

  const turn = Math.PI * 2

  // see: https://github.com/d3/d3-shape/blob/master/README.md#pie
  let data = [black, white]
  let colors = ['black', 'white']
  let arcs = d3.pie()(data)

  let normal = !inverted

  let panels = [
    {
      label: 'Percentage of color in this image',
    },
    {
      label: `Amount of ${normal ? 'black' : 'white'} by panel`,
    },
    {
      label: `Location of ${normal ? 'black' : 'white'} in this image`,
    },
  ]

  let panelPadding = 10
  let panelWidth = (width - panelPadding * 4) / 3
  let panelHeight = height - panelPadding * 2

  let panelData = [panel1, panel2, panel3]
  if (inverted) {
    panelData = _.map(panelData, (c) => 1 - c)
  }

  let barGraphPadding = 30
  let pieRadius = panelWidth * 0.75 * 0.5

  let arcPaths = _.map(arcs, (c: any, cIdx: number) => {
    let arc = d3
      .arc()
      .innerRadius(8)
      .outerRadius(pieRadius)
      .startAngle(c.startAngle + turn * 0.7)
      .endAngle(c.endAngle + turn * 0.7)
      .cornerRadius(8) as any
    //.padAngle(turn * 0.01)
    return {
      arc: arc(),
      centroid: arc.centroid(),
      label: cIdx == 0 ? 'Black' : 'White',
      labelColor:
        cIdx == 0 ? (inverted ? 'white' : 'white') : normal ? 'black' : 'black',
    }
  })

  let recursionScale = (panelWidth / width) * 0.9

  let panelMax =
    (d3.max([props.panel1, props.panel2, props.panel3]) || 1) * 1.25
  let panelDataScaled = [
    panel1 / panelMax,
    panel2 / panelMax,
    panel3 / panelMax,
  ]

  return (
    <g>
      <rect
        key='background'
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={normal ? 'white' : 'black'}
        strokeWidth={3}
        fill={normal ? 'white' : 'black'}
      />
      {_.map(panels, (c, cIdx) => (
        <g
          key={cIdx}
          transform={`translate(${
            ((width - panelPadding) / 3) * cIdx + panelPadding
          },${panelPadding})`}
        >
          <rect
            key={cIdx}
            x={0}
            y={0}
            width={panelWidth}
            height={panelHeight}
            stroke={normal ? 'black' : 'white'}
            strokeWidth={3}
            fill={normal ? 'white' : 'black'}
          />
          <text dx={5} dy={20} fill={inverted ? 'white' : 'black'}>
            {c.label}
          </text>
        </g>
      ))}
      <g
        transform={`translate(${(width - panelPadding) / 3 / 2},${height / 2})`}
      >
        {_.map(arcPaths, (c, cIdx) => (
          <path
            key={cIdx}
            d={c.arc}
            stroke={normal ? 'black' : 'white'}
            fill={colors[cIdx % colors.length]}
            strokeWidth='4'
          />
        ))}
        {_.map(arcPaths, (c, cIdx) => (
          <g key={'label' + cIdx}>
            {/* <circle
                  cx={c.centroid[0]}
                  cy={c.centroid[1]}
                  strokeWidth={1} r={2}
                  fill={inverted ? 'black' : 'white'}
                  stroke={normal ? 'black' : 'white'}
                /> */}
            <text
              x={c.centroid[0]}
              y={c.centroid[1]}
              textAnchor='middle'
              fill={c.labelColor}
            >
              {c.label}
            </text>
          </g>
        ))}
      </g>

      <g
        transform={`translate(${
          (width - panelPadding) / 3 + panelPadding
        },${panelPadding})`}
      >
        <line
          x1={barGraphPadding}
          x2={panelWidth - barGraphPadding}
          y1={panelHeight - barGraphPadding}
          y2={panelHeight - barGraphPadding}
          stroke={normal ? 'black' : 'white'}
          strokeWidth={3}
        />
        <line
          x1={barGraphPadding}
          x2={barGraphPadding}
          y1={barGraphPadding}
          y2={panelHeight - barGraphPadding}
          stroke={normal ? 'black' : 'white'}
          strokeWidth={3}
        />
        {_.map(panelDataScaled, (c, cIdx) => (
          <g
            key={cIdx}
            transform={`translate(${barGraphPadding},${barGraphPadding})`}
          >
            <rect
              x={20 + ((panelWidth - barGraphPadding - 20 * 2) / 3) * cIdx}
              y={
                panelHeight -
                barGraphPadding * 2 -
                (panelHeight - barGraphPadding) * c
              }
              width={panelWidth / 6}
              height={(panelHeight - barGraphPadding) * c}
              stroke={normal ? 'black' : 'white'}
              strokeWidth={3}
              fill={normal ? 'black' : 'white'}
            />
            <text
              y={panelHeight * 0.85}
              x={20 + 20 + ((panelWidth - barGraphPadding - 20 * 2) / 3) * cIdx}
            >
              {cIdx + 1}
            </text>
          </g>
        ))}
      </g>

      <g
        transform={`translate(${(2 * width) / 3 + panelPadding * 2},${
          panelPadding + panelHeight / 2 - (panelHeight / 2) * recursionScale
        })`}
      >
        <line
          x1={-10}
          x2={panelWidth * 0.9}
          y1={panelHeight * recursionScale + 20}
          y2={panelHeight * recursionScale + 20}
          stroke={normal ? 'black' : 'white'}
          strokeWidth={2}
        />
        <line
          x1={-10}
          x2={-10}
          y1={0 - 20}
          y2={panelHeight * recursionScale + 20}
          stroke={normal ? 'black' : 'white'}
          strokeWidth={2}
        />

        <g transform={`scale(${recursionScale},${recursionScale})`}>
          <RecursiveGraphGraph
            width={width}
            height={height}
            black={black}
            white={white}
            panel1={panel1}
            panel2={panel2}
            panel3={panel3}
            recursionNumber={recursionNumber + 1}
            inverted={inverted}
            mouseX={mouseX}
            mouseY={mouseY}
            mouseActive={mouseActive}
          />
        </g>
      </g>

      {mouseActive ? (
        <circle
          cx={mouseX}
          cy={mouseY}
          strokeWidth={4}
          r={75}
          fill={inverted ? 'black' : 'white'}
          stroke={normal ? 'black' : 'white'}
        />
      ) : null}
    </g>
  )
}
