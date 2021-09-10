import * as React from 'react'
import { Layout } from '../layout/Layout'
import { Abstract, Published } from '../shared/Abstract'
import { ClientOnly } from '../shared/ClientOnly'
import * as pubSub from './simplestPubSub'

export const TestSimplestPubSubFull = () => {
  return (
    <Layout title='Simplest PubSub'>
      <Abstract>
        Simplest Publish-Subscribe for React I can think of
        <Published>not yet published</Published>
      </Abstract>
      <ClientOnly>
        <TestSimplestPubSub />
        <TestCrossComponentPublish />
        <TestSubscriber />
      </ClientOnly>
    </Layout>
  )
}

pubSub.setLogging(true)

const topicAdd = 'Test:Add'
const topicSub = 'Test:Sub'
export const TestSimplestPubSub = () => {
  let [count, setCount] = React.useState(100)

  // React.useEffect(() => {
  //   const handler = () => {
  //     setCount(count + 1)
  //   }
  //   subscribe(topicAdd, handler)
  //   return () => {
  //     unsubscribe(topicAdd, handler)
  //   }
  // })

  pubSub.useSubscription(topicAdd, () => {
    setCount(count + 1)
  })
  pubSub.useSubscription(topicSub, () => {
    setCount(count - 1)
  })

  return (
    <div>
      <div style={{ margin: '5em' }}>
        <div>Count: {count}</div>
        <div>
          <button onClick={() => pubSub.publish(topicAdd)}>Add</button>
        </div>
        <div>
          <button onClick={() => pubSub.publish(topicSub)}>Sub</button>
        </div>
        <div>
          <button onClick={pubSub.report}>Report to Console</button>
        </div>
      </div>
    </div>
  )
}

export const TestSubscriber = () => {
  let [count, setCount] = React.useState(200)

  pubSub.useSubscription(topicAdd, () => {
    setCount(count + 1)
  })
  pubSub.useSubscription(topicSub, () => {
    setCount(count - 1)
  })

  return (
    <div>
      <div style={{ margin: '5em' }}>
        <div>Count: {count}</div>
      </div>
    </div>
  )
}

export const TestCrossComponentPublish = () => {
  return (
    <div>
      <div style={{ margin: '5em' }}>
        <div>
          <button
            onClick={() => {
              pubSub.publish(topicAdd)
              setTimeout(() => {
                pubSub.publish(topicAdd)
              }, 1)
            }}
          >
            Add 2
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              pubSub.publish(topicSub)
              setTimeout(() => {
                pubSub.publish(topicSub)
              }, 1)
            }}
          >
            Sub 2
          </button>
        </div>
      </div>
    </div>
  )
}
