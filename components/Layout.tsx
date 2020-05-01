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
          <>
            {cIdx !== 0 && <> | </>}
            <Link href={c[0]}>
              <a>{c[1]}</a>
            </Link>{' '}
          </>
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
