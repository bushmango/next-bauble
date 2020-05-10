export const GraphArea = (props: {
  isDebug?: boolean
  x: number
  y: number
  width: number
  height: number
  color?: string
  label: string
  children: React.ReactNode
}) => {
  let color = props.color || '#def'

  let { x, y, width, height, label, isDebug } = props

  return (
    <g transform={`translate(${x}, ${y})`}>
      {isDebug ? (
        <g>
          <rect width={width} height={height} stroke='none' fill={color}></rect>
          <text dy='20' dx='5'>
            {label}
          </text>
        </g>
      ) : null}
      {props.children}
    </g>
  )
}
