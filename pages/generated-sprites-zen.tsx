import { NextPage } from 'next'
import * as React from 'react'
import { GeneratedSprites } from '../components/gen/GeneratedSprites'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <GeneratedSprites />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
