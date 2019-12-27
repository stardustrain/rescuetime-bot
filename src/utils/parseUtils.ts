const floor = Math.floor

export const parseTime = (time?: number) => {
  if (!time) {
    throw Error('Wrong time.')
  }
  const hour = floor(Math.abs(time))
  const mins = (hour === 0) ? floor(time * 60) : floor((time * 60) - (hour * 60))

  return {
    hour,
    mins,
  }
}
