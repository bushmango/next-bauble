import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { KochSnowflakeFractal1 } from '../components/trash-compactor/koch/Koch1'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <KochSnowflakeFractal1 />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
