import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly-sidecar'
import { ScreenCenter } from '../components/shared/ScreenCenter-sidecar'
import { FractalTree } from '../components/trash-compactor/FractalTree-sidecar'

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
