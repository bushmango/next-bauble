import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { FractalMonkey } from '../components/trash-compactor/fractal/FractalMonkey'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <FractalMonkey />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
