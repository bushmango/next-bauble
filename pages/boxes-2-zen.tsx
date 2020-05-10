import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { Boxes2 } from '../components/trash-compactor/boxes/Boxes2'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <Boxes2 />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
