import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { RecursiveGraph } from '../components/trash-compactor/xkcd/RecursiveGraph'
const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <RecursiveGraph />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
