import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { KochSnowflakeFractal2 } from '../components/trash-compactor/koch/Koch2'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <KochSnowflakeFractal2 />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
