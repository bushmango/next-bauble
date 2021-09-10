import React from 'react'

const namespace = 'SimplestPubSub'
let verbose = false
export function setLogging(log: boolean) {
  verbose = log
}

export interface ISubscriptionInfo {
  handlers: Array<() => void>
  publishedCount: number
  subscribedCount: number
}
const subs: { [key: string]: ISubscriptionInfo } = {}

export function report() {
  console.info(namespace, 'Report')
  console.info(namespace, '------')
  let keys = Object.keys(subs)
  console.info(namespace, `${keys.length} topics subscribed`)
  let totalSubs = 0
  keys.forEach((c) => {
    let subInfo = subs[c]
    console.info(
      namespace,
      c,
      `${subInfo.handlers.length} subscribed`,
      `${subInfo.publishedCount} publishes`,
      `${subInfo.subscribedCount} total subscriptions`,
    )
    totalSubs += subInfo.handlers.length
  })
  console.info(namespace, `${totalSubs} total subscriptions`)
  console.info(namespace, '------')
}

export function subscribe(
  topic: string,
  handler: () => void,
  maxSubscriptionsWarning = 5,
) {
  if (!subs[topic]) {
    if (verbose) {
      console.log(namespace, topic, 'creating new topic')
    }
    subs[topic] = {
      handlers: [],
      publishedCount: 0,
      subscribedCount: 0,
    }
  }
  subs[topic].handlers.push(handler)
  subs[topic].subscribedCount++
  if (verbose) {
    console.log(
      namespace,
      topic,
      'subscribed',
      subs[topic].handlers.length + ' subscriptions',
    )
  }
  let numSubscriptions = subs[topic].handlers.length
  if (numSubscriptions > maxSubscriptionsWarning) {
    console.warn(
      namespace,
      topic,
      'too many subscriptions to this topic (possible memory leak)',
      numSubscriptions,
      'max: ' + maxSubscriptionsWarning,
    )
  }
}
export function unsubscribe(topic: string, handler: () => void) {
  if (!subs[topic]) {
    console.warn(
      namespace,
      topic,
      'unsubscribe called when nothing is subscribed to this topic',
    )
    return
  }
  let index = subs[topic].handlers.indexOf(handler)
  if (index === -1) {
    console.warn(
      namespace,
      topic,
      'unsubscribe called when not subscribed to this topic, possible memory leak',
    )
    return
  }
  subs[topic].handlers.splice(index, 1)
  if (verbose) {
    console.log(
      namespace,
      topic,
      'unsubscribed',
      subs[topic].handlers.length + ' subscriptions',
    )
  }
  subs[topic]
}

export function publish(topic: string) {
  if (!subs[topic]) {
    if (verbose) {
      console.log(namespace, topic, 'published', '0 subscribers')
    }
    return
  }
  subs[topic].publishedCount++
  if (verbose) {
    console.log(
      namespace,
      topic,
      'published',
      subs[topic].handlers.length + ' subscribers',
    )
  }
  subs[topic].handlers.forEach((c) => {
    c()
  })
}

export function useSubscription(topic: string, handler: () => void) {
  React.useEffect(() => {
    subscribe(topic, handler)
    return () => {
      unsubscribe(topic, handler)
    }
  })
}
