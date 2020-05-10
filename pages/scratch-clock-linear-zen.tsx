import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly-sidecar'
import { ScreenCenter } from '../components/shared/ScreenCenter-sidecar'
import { ScratchClockLinear } from '../components/trash-compactor/clocks/ScratchClockLinear-sidecar'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <ScratchClockLinear />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
