import * as l from 'lodash'
import * as React from 'react'
import { useAnimationForever } from '../../lib/useAnimationForever'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { ClientOnly } from '../shared/ClientOnly'
import { SeeInternalLink, SeeLink } from '../shared/SeeLink'
import { ZenLink } from '../shared/ZenLink'
import chroma from 'chroma-js'

export const GameOfLifeGenesFull = () => {
  return (
    <Layout title='Game of Life Genes'>
      <Abstract>
        A work-in-progress experiment in adding color and genes to Conway's Game
        of Life
        <Published>8/23/2021 - ?</Published>
      </Abstract>
      <SeeLink href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>
        Conway's Game of Life
      </SeeLink>
      <SeeLink href='https://en.wikipedia.org/wiki/John_Horton_Conway'>
        John Horton Conway
      </SeeLink>
      <SeeInternalLink href='/game-of-life-classic' />
      <ZenLink href='/game-of-life-genes-zen' />
      <ClientOnly>
        <GameOfLifeGenes full={false} classic={false} />
      </ClientOnly>
    </Layout>
  )
}

const random = require('fast-random')
const seed = Date.now()
const generator = random(seed)
function getRandomBetween(a: number, b: number) {
  return a + (generator.nextInt() % (b - a + 1))
}

interface ICell {
  i: number
  j: number
  life: number
  prevLife: number
  n: number
  color: string
}
let board = {
  cellsWidth: 0,
  cellsHeight: 0,
  cells: [] as ICell[],
  frameNum: 0,
}

export const getCell = (i: number, j: number) => {
  if (i < 0 || j < 0) {
    return null
  }
  if (i >= board.cellsWidth || j >= board.cellsHeight) {
    return null
  }
  return board.cells[i + j * board.cellsWidth]
}

export const initBoard = (cellsWidth: number, cellsHeight: number) => {
  board.cells = []
  board.cellsWidth = cellsWidth || 22
  board.cellsHeight = cellsHeight || 22
  board.frameNum = 0
  for (let j = 0; j < board.cellsHeight; j++) {
    for (let i = 0; i < board.cellsWidth; i++) {
      board.cells.push({
        i,
        j,
        life: 0,
        prevLife: 0,
        n: 0,
        color: 'black',
      })
    }
  }

  let numSprinkles = (board.cellsWidth * board.cellsHeight) / 8
  for (let n = 0; n < numSprinkles; n++) {
    let i = getRandomBetween(0, board.cellsWidth - 1)
    let j = getRandomBetween(0, board.cellsHeight - 1)

    let c = getCell(i, j)
    if (c) {
      c.life = c.prevLife = 1
      c.color = chroma.random().hex()
    }
  }
}

let step = 1 / 60

export const onePass = (classic: boolean = false) => {
  board.frameNum++

  let classicFrameCount = 32
  let classicStep = (1 / classicFrameCount) * 1.5
  let isFullStep = board.frameNum % classicFrameCount === 0

  for (let j = 0; j < board.cellsHeight; j++) {
    for (let i = 0; i < board.cellsWidth; i++) {
      let c = getCell(i, j)
      if (c) {
        if (classic) {
          if (isFullStep) {
            c.prevLife = c.life
          }
        } else {
          c.prevLife = c.life
        }
      }
    }
  }

  for (let j = 0; j < board.cellsHeight; j++) {
    for (let i = 0; i < board.cellsWidth; i++) {
      let c = getCell(i, j)
      if (c) {
        let n = countNeighbors(i, j, 0.5)
        c.n = n

        let lifeAdj = 0

        if (c.life > 0.25) {
          if (n < 2) {
            lifeAdj = -step
          } else if (n > 3) {
            lifeAdj = -step
          } else {
            lifeAdj = +step
          }
        } else {
          if (n === 3) {
            lifeAdj = +step * 1
          } else {
            lifeAdj = -step
          }
        }

        if (c.life <= 0 && lifeAdj > 0) {
          // A new cell appears!
          let color = getAverageNeighborColor(i, j, 0.5)
          c.color = color.hex() // chroma.random().hex()
        }

        c.life += lifeAdj
        if (c.life <= 0) {
          c.life = 0
          c.color = 'gray'
        }
        if (c.life > 1) {
          c.life = 1
        }

        // c.color = c.life > 0 ? 'blue' : 'gray'
      }
    }
  }
}

export const isAlive = (i: number, j: number, limit: number) => {
  let c = getCell(i, j)
  if (c && c.prevLife > limit) {
    return true
  }
  return false
}
export const countNeighbors = (i: number, j: number, limit: number) => {
  let neighbors = 0
  if (isAlive(i + 1, j - 1, limit)) {
    neighbors++
  }
  if (isAlive(i + 1, j, limit)) {
    neighbors++
  }
  if (isAlive(i + 1, j + 1, limit)) {
    neighbors++
  }
  if (isAlive(i - 1, j - 1, limit)) {
    neighbors++
  }
  if (isAlive(i - 1, j, limit)) {
    neighbors++
  }
  if (isAlive(i - 1, j + 1, limit)) {
    neighbors++
  }
  if (isAlive(i, j - 1, limit)) {
    neighbors++
  }
  if (isAlive(i, j + 1, limit)) {
    neighbors++
  }

  return neighbors
}

export const getAverageNeighborColor = (
  i: number,
  j: number,
  limit: number,
) => {
  let neighbors = 0
  let r = 0
  let b = 0
  let g = 0

  let check = (oi: number, oj: number) => {
    if (isAlive(i + oi, j + oj, limit)) {
      neighbors++
      let c = getCell(i + oi, j + oj)
      if (c) {
        let chrom = chroma(c.color)
        let rgb = chrom.rgb(false)
        r += rgb[0]
        g += rgb[1]
        b += rgb[2]
      }
    }
  }

  check(-1, -1)
  check(0, -1)
  check(1, -1)
  check(-1, 0)
  //check(0, 0)
  check(1, 0)
  check(-1, 1)
  check(0, 1)
  check(1, 1)

  if (neighbors > 0) {
    r /= neighbors
    g /= neighbors
    b /= neighbors
  }

  let finalColor = chroma(r, g, b)
  return finalColor
}

const _global = global as any

let isMouseDown = false

const onMouseMove = (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
  if (!isMouseDown) {
    return
  }

  // see: https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
  // e = Mouse click event.
  let rect = (ev.target as any).getBoundingClientRect()
  let x = ev.clientX - rect.left //x position within the element.
  let y = ev.clientY - rect.top //y position within the element.

  if (x && y) {
    let s = 20
    let i = Math.floor((x - s / 2) / s)
    let j = Math.floor((y - s / 2) / s)
    let c = getCell(i, j)
    if (c) {
      c.life = 1
    }
  }
}

export const GameOfLifeGenes = (props: {
  full: boolean
  classic?: boolean
}) => {
  React.useEffect(() => {
    if (props.full) {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight

      initBoard(Math.floor(width / 20) - 2, Math.floor(height / 20) - 1)
    } else {
      initBoard(22, 22)
    }
  }, [])

  // let elapsed = useAnimationForever()
  useAnimationForever()
  // let speed = 1
  // let elapsedCircular = (elapsed * speed) % 1000

  let r = 10
  let sizeW = r * board.cellsWidth * 2 + r * 2
  let sizeH = r * board.cellsHeight * 2 + r * 2

  let sx = sizeW / 2 - (board.cellsWidth / 2) * r * 2 + r
  let sy = sizeH / 2 - (board.cellsHeight / 2) * r * 2 + r

  onePass(props.classic)

  if (typeof _global.window === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* <div>
        {board.cellsWidth}x{board.cellsHeight} {elapsedCircular}
      </div> */}
      <div>
        <svg
          style={{ cursor: 'pointer' }}
          width={sizeW}
          height={sizeH}
          onMouseDown={(ev) => {
            isMouseDown = true
            onMouseMove(ev)
          }}
          onMouseUp={() => {
            isMouseDown = false
          }}
          onMouseMove={onMouseMove}
        >
          {l.map(board.cells, (c: ICell, cIdx: number) => {
            return (
              <circle
                key={cIdx}
                cx={sx + c.i * r * 2}
                cy={sy + c.j * r * 2}
                r={(r - 2) * c.life + 2}
                stroke={c.life > 0.1 ? 'green' : 'gray'}
                fill={c.color}
                // onClick={() => {
                //   c.life = 1
                // }}
              />
            )
          })}

          {/* {l.map(board.cells, (c: ICell) => {
            return (
              <text
                x={sx + c.i * r * 2}
                y={sy + c.j * r * 2}
                textAnchor='middle'
                dominantBaseline='middle'
              >
                {'' + c.color}
              </text>
            )
          })} */}

          {/* <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={'black'}
            fill={'white'}
          /> */}
          {/* <text
            x={size / 2}
            y={size / 2}
            textAnchor='middle'
            dominantBaseline='middle'
          >
            Life
          </text> */}
        </svg>
      </div>
    </div>
  )
}
