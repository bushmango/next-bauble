import * as React from 'react'
import css from './AppLayout.module.scss'
export const AppLayout = () => {
  return (
    <div>
      <div className={css.header}>top bar</div>
      <div className={css.toolbar}> toolbar</div>
      <div className={css.main}>main area</div>
      <div className={css.footer}>bottom bar</div>
    </div>
  )
}
