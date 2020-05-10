import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { KochSnowflakeFractal3 } from '../components/trash-compactor/koch/Koch3'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <KochSnowflakeFractal3 />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
