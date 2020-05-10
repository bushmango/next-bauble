import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly-sidecar'
import { ScreenCenter } from '../components/shared/ScreenCenter-sidecar'
import { ScratchClockRadial } from '../components/trash-compactor/ScratchClockRadial'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <ScratchClockRadial />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page