import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { ScratchClockRadial } from '../components/trash-compactor/clocks/ScratchClockRadial'

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
