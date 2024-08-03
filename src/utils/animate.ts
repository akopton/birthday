export const animate = async (
  callback: React.Dispatch<React.SetStateAction<number>>,
  breakpoints: { breakpoint: number; timeout: number }[]
) => {
  await promiseTimeout(2000)

  for (const b of breakpoints) {
    await new Promise(async (resolve) => {
      await promiseInterval(
        callback,
        Math.floor(Math.random() * 100),
        b.breakpoint
      )
      await promiseTimeout(b.timeout)
      resolve("")
    })
  }
}

const promiseInterval = async (
  callback: React.Dispatch<React.SetStateAction<number>>,
  ms: number,
  resolveCondition: number
) =>
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      callback((prev) => {
        if (prev >= resolveCondition) {
          clearInterval(interval)
          resolve(prev)
          return prev
        }
        return prev + 1
      })
    }, ms)
  })

const promiseTimeout = async (ms: number) =>
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("")
    }, ms)
  })
