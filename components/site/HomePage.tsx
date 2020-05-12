import * as React from 'react'
import { Layout } from '../layout/Layout'
import { GridLinks } from '../layout/GridLinks'

export const HomePage = () => {
  return (
    <Layout title='Curio Cabinet of Curiosities @ StevieBushman'>
      <h2>Curio Cabinet of Curiosities: Bibelots and Baubles</h2>
      <div>Little delights to make and observe</div>

      <GridLinks />
    </Layout>
  )
}
