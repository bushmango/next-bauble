import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { Boxes1 } from '../components/trash-compactor/boxes/Boxes1'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <Boxes1 />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
