const floor = Math.floor

export const parseTime = (time?: number) => {
  if (!time) {
    throw Error('Wrong time.')
  }

  const absTime = Math.abs(time)
  const hour = floor(absTime)
  const mins = (hour === 0) ? floor(absTime * 60) : floor((absTime * 60) - (hour * 60))

  return {
    hour,
    mins,
    isDecrease: time < 0
  }
}
