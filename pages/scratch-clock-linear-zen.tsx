import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { ScratchClockLinear } from '../components/trash-compactor/clocks/ScratchClockLinear'

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
