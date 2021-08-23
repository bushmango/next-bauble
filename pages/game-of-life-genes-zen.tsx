import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { GameOfLifeGenes } from '../components/life/GameOfLifeGenes'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <GameOfLifeGenes full={true} />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
