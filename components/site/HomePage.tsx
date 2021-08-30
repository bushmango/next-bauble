import * as React from 'react'
import { Layout } from '../layout/Layout'
import { GridLinks } from '../layout/GridLinks'

export const HomePage = () => {
  return (
    <Layout title='The art of Stevie Bee'>
      <h1>
        The art of Stevie Bee{' '}
        <small style={{ fontSize: '12px' }}>
          Little delights to make and observe
        </small>
      </h1>
      {/* <h2>Curio Cabinet of Curiosities: Bibelots and Baubles</h2> */}

      <GridLinks />
    </Layout>
  )
}
