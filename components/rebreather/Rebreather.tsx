import * as React from 'react'
import { useAnimationForever } from '../../lib/useAnimationForever-sidecar'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { ClientOnly } from '../shared/ClientOnly'
import { ZenLink } from '../shared/ZenLink'

export const RebreatherFull = () => {
  return (
    <Layout title='Rebreather'>
      <Abstract>
        4-7-8 breathing exercise visualizer. Breathe in for four seconds, hold
        for seven seconds, breathe out for eight. Repeat 4-8 times.
        <Published>4/15/2020</Published>
      </Abstract>

      <ZenLink href='/rebreather-zen' />
      <ClientOnly>
        <Rebreather />
      </ClientOnly>
    </Layout>
  )
}

export const Rebreather = () => {
  let elapsed = useAnimationForever()

  let speed = 1
  // 4-7-8 breathing
  let section1Length = 4 * 1000
  let section2Length = 7 * 1000
  let section3Length = 8 * 1000

  let total = section1Length + section2Length + section3Length
  let elapsedCircular = (elapsed * speed) % total
  let elapsedSection = 0

  // let sectionNum = 0
  let text = ''

  let size = 300
  let r = 50

  if (elapsedCircular <= section1Length) {
    // sectionNum = 0
    elapsedSection = elapsedCircular
    text = 'Breathe in'

    r = 50 + (elapsedSection / section1Length) * 50
  }
  if (
    elapsedCircular >= section1Length &&
    elapsedCircular < section1Length + section2Length
  ) {
    //   sectionNum = 1
    elapsedSection = elapsedCircular - section1Length
    text = 'Hold breath'
    r = 100
  }
  if (elapsedCircular >= section1Length + section2Length) {
    //    sectionNum = 2
    elapsedSection = elapsedCircular - section1Length - section2Length
    text = 'Breathe out'
    r = 100 - (elapsedSection / section3Length) * 50
  }

  return (
    <div>
      <div>
        <svg width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={'black'}
            fill={'white'}
          />
          <text
            x={size / 2}
            y={size / 2}
            textAnchor='middle'
            dominantBaseline='middle'
          >
            {text}
          </text>
        </svg>
      </div>
    </div>
  )
}
