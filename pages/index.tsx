import { NextPage } from 'next'
import * as React from 'react'
import { Layout } from '../components/layout/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout title='Curiosities @ StevieBushman'>
      <h2>Bibelots and Baubles</h2>
      <div>Little delights to make and observe</div>
    </Layout>
  )
}

export default IndexPage
