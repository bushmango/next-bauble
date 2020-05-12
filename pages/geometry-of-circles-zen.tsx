import { NextPage } from 'next'
import * as React from 'react'
import { GeometryOfCircles } from '../components/geometry-of-circles/GeometryOfCircles'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <GeometryOfCircles />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
