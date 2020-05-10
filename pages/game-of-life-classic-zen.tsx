import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { GameOfLife } from '../components/life/GameOfLife'
import { ScreenCenter } from '../components/shared/ScreenCenter'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <GameOfLife full={true} classic={true} />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
