import { NextPage } from 'next'
import * as React from 'react'
import { Rebreather } from '../components/rebreather/Rebreather'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { ClientOnly } from '../components/shared/ClientOnly'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <Rebreather />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
