import React from 'react'

export const Translate = (props: {
  x?: number
  y?: number
  children: React.ReactNode
}) => {
  return (
    <g transform={`translate(${props.x || 0}, ${props.y || 0})`}>
      {props.children}
    </g>
  )
}
