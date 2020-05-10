import { useEffect, useRef, useState } from 'react'

export function useIntervalForever(millis: number) {
  const [state, setState] = useState({
    elapsed: 0,
    interval: 0,
  })

  let isCancelled = useRef(false)

  useEffect(() => {
    let start: number
    let count: number

    function onStart() {
      // Start the loop
      start = Date.now()
      count = 0
      loop()
    }
    // Call onFrame() on next animation frame
    function loop() {
      setTimeout(() => {
        if (isCancelled.current) {
          return
        }
        count++
        setState({
          interval: count,
          elapsed: Date.now() - start,
        })

        loop()
      }, millis)
    }

    onStart()

    // Clean things up
    return () => {
      isCancelled.current = true
    }
  }, [millis])

  return [state.elapsed, state.interval]
}
