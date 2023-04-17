export const moveArray = <T>(from: number, to: number, array: T[]): T[] => {
  const newArray = array.slice()
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  )
  return newArray
}
