import _ from 'lodash'
import { GraphArea } from './GraphArea'

export const Graph = (props: {
  width?: number
  height?: number
  fill?: string
  children: React.ReactNode
}) => {
  const defaultProps = {
    width: 100,
    height: 100,
    fill: 'white',
  }

  let p = _.merge({}, defaultProps, props)
  let { width, height, fill } = p

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      width={width}
      height={height}
      style={{
        backgroundColor: fill,
        display: 'block',
      }}
    >
      <GraphArea
        x={0}
        y={0}
        width={width}
        height={height}
        isDebug={false}
        label='Graph'
      >
        {props.children}
      </GraphArea>
    </svg>
  )
}
