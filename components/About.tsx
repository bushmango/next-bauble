import * as React from 'react'
import { Abstract } from './Abstract'
import { Layout } from './Layout'

export const AboutFull = () => {
  return (
    <Layout title='About'>
      <Abstract>Abooot</Abstract>
      <div>Fruit: {process.env.FRUIT}</div>
    </Layout>
  )
}
