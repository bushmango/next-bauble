import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { Boxes3 } from '../components/trash-compactor/boxes/Boxes3'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <Boxes3 />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
