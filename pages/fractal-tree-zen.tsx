import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { FractalTree } from '../components/trash-compactor/fractal/FractalTree'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <FractalTree scale={1.5} />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
