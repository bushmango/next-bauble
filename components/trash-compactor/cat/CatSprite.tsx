import _ from 'lodash'
import React from 'react'
import { useIntervalForever } from '../../../lib/useIntervalForever-sidecar'
import { Layout } from '../../layout/Layout'
import { Abstract, Published } from '../../shared/Abstract-sidecar'
import { ClientOnly } from '../../shared/ClientOnly'
import { SeeLink } from '../../shared/SeeLink'
import { ZenLink } from '../../shared/ZenLink'

export const CatSpriteFull = () => {
  return (
    <Layout title='Cat Sprite'>
      <Abstract>
        A cat drawing I commissioned from a friend, the talented E.L. Anthony.
        Originally part of the Trash-Compactor collection.
        <SeeLink href='https://xkcd.com/688/' />
        <Published>Republished: 5/10/2020</Published>
      </Abstract>

      <ZenLink href='/cat-sprite-zen' />

      <ClientOnly>
        <CatSprite />
      </ClientOnly>
    </Layout>
  )
}

export const CatSprite = () => {
  let [elapsed, iteration] = useIntervalForever((1000 / 60) * 15)

  let [state, setState] = React.useState({
    frame: 0,
    lastFrame: 0,
    isPlaying: true,
    hasOnion: false,
  })

  React.useEffect(() => {
    if (state.isPlaying) {
      _adjustFrame(1, true)
    }
  }, [iteration])

  const mergeState = (newState: any) => {
    setState(_.merge({}, state, newState))
  }

  const _adjustFrame = (frames: any, play: any) => {
    let currentFrame = state.frame
    let nextFrame = currentFrame + frames
    mergeState({
      frame: nextFrame,
      lastFrame: currentFrame,
      isPlaying: play,
    })
  }

  const _nextFrame = () => {
    _adjustFrame(1, false)
  }

  const _prevFrame = () => {
    _adjustFrame(-1, false)
  }

  const _togglePlay = () => {
    mergeState({ isPlaying: !state.isPlaying })
  }

  const _toggleOnion = () => {
    mergeState({ hasOnion: !state.hasOnion })
  }

  let numFrames = 9
  let frame = state.frame % numFrames
  let lastFrame = state.lastFrame % numFrames

  let frameDatas = [
    { frame: 1, x: 100, y: 5 },
    { frame: 2, x: 70, y: 28 },
    { frame: 3, x: 0, y: 80 },
    { frame: 4, x: 50, y: 70 },
    { frame: 5, x: 0, y: 78 },
    { frame: 6, x: -50, y: 120 },
    { frame: 7, x: -80, y: 40 },
    { frame: 8, x: 0, y: 65 },
    { frame: 9, x: -150, y: 115 },
  ]

  let frameData = frameDatas[frame]
  let frameDataOnion = frameDatas[lastFrame]

  return (
    <div style={{ minHeight: 2000 }}>
      {/* <div>
        Frame: {state.frame + 1} / {frame + 1}
      </div> */}
      <div style={{ display: 'flex' }}>
        <div
          style={{ fontSize: '2em', cursor: 'pointer', margin: 10 }}
          onClick={_prevFrame}
        >
          <i className='fa fa-step-backward'></i>
        </div>

        <div
          style={{ fontSize: '2em', cursor: 'pointer', margin: 10 }}
          onClick={_nextFrame}
        >
          <i className='fa fa-step-forward'></i>
        </div>

        <div
          style={{ fontSize: '2em', cursor: 'pointer', margin: 10 }}
          onClick={_togglePlay}
        >
          <i className={state.isPlaying ? 'fa fa-pause' : 'fa fa-play'}></i>
        </div>

        <div
          style={{ fontSize: '2em', cursor: 'pointer', margin: 10 }}
          onClick={_toggleOnion}
        >
          <i className='fa fa-circle-o'></i>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <img
          src={'/images/nine-cat/cat-00' + (frame + 1) + '.png'}
          style={{
            display: 'block',
            position: 'absolute',
            left: frameData.x,
            top: frameData.y,
          }}
        />

        {state.hasOnion ? (
          <img
            src={'/images/nine-cat/cat-00' + (lastFrame + 1) + '.png'}
            style={{
              display: 'block',
              position: 'absolute',
              opacity: 0.5,
              left: frameDataOnion.x,
              top: frameDataOnion.y,
            }}
          />
        ) : null}

        <svg
          style={{
            position: 'absolute',
          }}
          width={2000}
          height={2000}
        >
          <line
            x1={0}
            x2={2000}
            y1={850}
            y2={850}
            style={{}}
            strokeWidth={1}
            stroke='red'
          />
          <line
            x1={300}
            x2={300}
            y1={0}
            y2={2000}
            style={{}}
            strokeWidth={1}
            stroke='red'
          />
        </svg>
      </div>
    </div>
  )
}
