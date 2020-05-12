import _ from 'lodash'
import * as React from 'react'
import { links } from './links'

import css from './GridLinks.module.scss'
import { navTo } from '../../lib/navTo'

export const mapLink = (c: string) => {
  return c.replace('/', '') + '.png'
}
export const GridLinks = () => {
  let linksFiltered = _.filter(links, (c) => c[0] !== '/')

  return (
    <div className={css.grid}>
      {_.map(linksFiltered, (c) => {
        return (
          <div
            className={css.gridItem}
            onClick={() => {
              navTo(c[0])
            }}
          >
            <div>{c[0]}</div>
            <div>
              <a href={c[0]}>
                <img
                  src={`/images/hexes-out/${mapLink(c[0])}`}
                  title={c[1]}
                  alt={c[1] + ' screenshot'}
                />
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
