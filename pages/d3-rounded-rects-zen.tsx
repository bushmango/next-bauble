import { NextPage } from 'next'
import * as React from 'react'
import { ClientOnly } from '../components/shared/ClientOnly'
import { ScreenCenter } from '../components/shared/ScreenCenter'
import { D3RoundedRects } from '../components/trash-compactor/d3/D3RoundedRects'

const Page: NextPage = () => {
  return (
    <ScreenCenter>
      <ClientOnly>
        <D3RoundedRects size={1000} />
      </ClientOnly>
    </ScreenCenter>
  )
}

export default Page
