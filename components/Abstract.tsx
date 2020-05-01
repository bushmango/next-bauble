import css from './Abstract.module.scss'

export const Abstract = (props: { children: React.ReactNode }) => {
  return (
    <div className={css.abstract}>
      <div className={css.abstractTitle}>Abstract</div>
      {props.children}
    </div>
  )
}

export const Published = (props: { children: React.ReactNode }) => {
  return <div className={css.published}>Published: {props.children}</div>
}
export const Started = (props: { children: React.ReactNode }) => {
  return <div className={css.published}>Started: {props.children}</div>
}
