import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { D3PackEyes } from '../components/trash-compactor/pack/D3PackEyes'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <D3PackEyes />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
