import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { ScratchClockRadialAlt } from '../components/trash-compactor/clocks/ScratchClockRadialAlt'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <ScratchClockRadialAlt />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
