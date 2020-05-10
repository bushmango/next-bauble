import Head from 'next/head'
import * as React from 'react'
import css from './Layout.module.scss'
import Link from 'next/link'
import * as l from 'lodash'

const links = [
  ['/', 'Home'],
  ['/rebreather', 'Rebreather'],
  ['/game-of-life', 'Game of Life'],
  ['/game-of-life-classic', 'Game of Life Classic'],
  ['/geometry-of-circles', 'Geometry of Circles'],
  ['/scratch-clock-linear', 'Scratch Clock Linear'],
  ['/scratch-clock-radial', 'Scratch Clock Radial'],
  // ['/scratch-clock-radial-alt', 'Scratch Clock Radial (Alt)'],
  ['/fractal-tree', 'Fractal Tree'],
  ['/koch-snowflake-fractal-1', 'Koch Snowflake 1'],
  ['/koch-snowflake-fractal-2', 'Koch Snowflake 2'],
  ['/koch-snowflake-fractal-3', 'Koch Snowflake 3'],
  ['/boxes-1', 'Boxes 1'],
  ['/boxes-2', 'Boxes 2'],
  ['/boxes-3', 'Boxes 3'],
  ['/d3-pack', 'D3 Pack'],
  ['/d3-pack-eyes', 'D3 Pack Eyes'],
  ['/d3-rounded-rects', 'D3 Rounded Rects'],
  ['/fractal-monkey', 'Fractal Monkey'],
]

export const Layout = (props: { children: React.ReactNode; title: string }) => {
  return (
    <div className={css.layout}>
      <Head>
        <title>{props.title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap'
          rel='stylesheet'
        ></link>
      </Head>

      <div className={css.header}>
        {l.map(links, (c, cIdx) => (
          <React.Fragment key={cIdx}>
            {cIdx !== 0 && <> | </>}
            <Link href={c[0]}>
              <a>{c[1]}</a>
            </Link>{' '}
          </React.Fragment>
        ))}
      </div>
      {props.children}

      <footer>
        {/* <hr /> */}
        <span>&copy; 2020 Stevie Bushman &mdash; stevie@steviebushman.com</span>
      </footer>
    </div>
  )
}
