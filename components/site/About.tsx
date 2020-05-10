import * as React from 'react'
import { Abstract } from '../shared/Abstract'
import { Layout } from '../layout/Layout'

export const AboutFull = () => {
  return (
    <Layout title='About'>
      <Abstract>Abooot</Abstract>
      <div>Fruit: {process.env.FRUIT}</div>
    </Layout>
  )
}
