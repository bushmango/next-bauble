export const SeeLink = (props: { href: string; children: React.ReactNode }) => {
  return (
    <div>
      <a href={props.href}>See: {props.children}</a>
    </div>
  )
}
