import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { CatSprite } from '../components/trash-compactor/cat/CatSprite-sidecar'

const Page: NextPage = () => {
  return (
    <ClientOnly>
      <CatSprite />
    </ClientOnly>
  )
}

export default Page
