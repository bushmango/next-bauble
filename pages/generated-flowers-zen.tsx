import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { GeneratedFlowers } from '../components/gen/GeneratedFlowers'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <GeneratedFlowers />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
