import React, { useEffect } from 'react'

const formatDuration = (seconds) => {
  const min = Math.floor(seconds / 60)
  let sec = seconds - min * 60
  if (sec < 10) {
    sec = `0${sec}`
  }
  return {
    min,
    sec,
  }
}
function Timer({ count, setCount }) {
  useEffect(() => {
    const timer = setInterval(() => setCount((old) => old - 1), 1000)
    if (!count) {
      clearInterval(timer)
    }
    return () => {
      clearInterval(timer)
    }
  }, [count])

  return (
    <span>
      {formatDuration(count).min}:{formatDuration(count).sec}
    </span>
  )
}

export default Timer
