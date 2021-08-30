import _ from 'lodash'
import * as React from 'react'
import { links } from './links'

import css from './GridLinks.module.scss'
import { navTo } from '../../lib/navTo'
import { useRef } from 'react'

export const mapLink = (c: string) => {
  return c.replace('/', '') + '.png'
}

export const ImageWithFallback = (props: {
  src: string
  title: string
  alt: string
  errorSrc: string
}) => {
  let [isError, setIsError] = React.useState(false)
  const imgEl = useRef<HTMLImageElement>(null)
  React.useEffect(() => {
    if (imgEl.current) {
      if (imgEl.current.complete && imgEl.current.naturalHeight === 0) {
        setIsError(true)
      }
    }
  })
  return (
    <img
      ref={imgEl}
      src={isError ? props.errorSrc : props.src}
      title={props.title}
      alt={props.alt}
      onError={(ev) => {
        if (window) {
          // console.log('has error!!!')
          if (!isError) {
            setIsError(true)
          }
        }
      }}
    />
  )
}

export const GridLinks = () => {
  let linksFiltered = _.filter(links, (c) => c[0] !== '/')

  return (
    <div className={css.grid}>
      {_.map(linksFiltered, (c) => {
        return (
          <div
            key={c[0]}
            className={css.gridItem}
            onClick={() => {
              navTo(c[0])
            }}
          >
            <div>{c[0]}</div>
            <div>
              <a href={c[0]}>
                <ImageWithFallback
                  src={`/images/hexes-out/${mapLink(c[0])}`}
                  title={c[1]}
                  alt={c[1] + ' screenshot'}
                  errorSrc={'/images/hexes-out/in-development.png'}
                />
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
