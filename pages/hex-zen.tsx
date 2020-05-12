import { NextPage } from 'next'
import * as React from 'react'
import { Hex } from '../components/hex/Hex'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <Hex />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
