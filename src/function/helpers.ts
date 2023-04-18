import IElement from '../interface/Element'
import ItemTypes from '../utils/itemTypes'
export const sideBarToBody = (element: IElement, array: IElement[]) => {
  array.push({ ...element, actionState: ItemTypes.tagFromBody })

  return array
}

export const deepCopyOfArray = <T>(array: T[]): T[] => {
  const arrayString = JSON.stringify(array)
  return JSON.parse(arrayString)
}

export const sideBarToRow = (
  element: IElement,
  rowIndex: number,
  array: IElement[]
) => {
  const cloneElements = deepCopyOfArray(array)
  const row = cloneElements.find((_, index) => index === rowIndex)
  if (row) {
    if (row.children) {
      row.children.push({ ...element, actionState: `tagFromRow-${rowIndex}` })
    } else {
      row.children = [{ ...element, actionState: `tagFromRow-${rowIndex}` }]
    }
  }

  return cloneElements
}

export const bodyToRow = (
  rowIndex: number,
  elementIndex: number,
  array: IElement[]
) => {
  const cloneElements = deepCopyOfArray(array)
  const row = cloneElements.find((_, index) => index === rowIndex)
  if (row) {
    // if row have already a children
    if (row.children) {
      row.children.push({
        ...array[elementIndex],
        actionState: `tagFromRow-${rowIndex}`,
      })

      // remove element from body
      cloneElements.splice(elementIndex, 1)
    }
    // create children
    else {
      row.children = [
        { ...array[elementIndex], actionState: `tagFromRow-${rowIndex}` },
      ]

      // remove element from body
      cloneElements.splice(elementIndex, 1)
    }
  }

  return cloneElements
}

export const rowToBody = (
  rowIndex: number,
  elementIndex: number,
  array: IElement[]
) => {
  const cloneElements = deepCopyOfArray(array)
  const row = cloneElements.find((_, index) => index === rowIndex)

  if (row) {
    if (row.children) {
      // copy elements row to body
      cloneElements.push({
        ...row.children[elementIndex],
        actionState: ItemTypes.tagFromBody,
      })

      // remove elements from row
      row.children.splice(elementIndex, 1)

      return cloneElements
    }
  }
  return array
}

export const rowToRow = (
  elementIndex: number,
  fromRowIndex: number,
  toRowIndex: number,
  array: IElement[]
) => {
  const cloneElements = deepCopyOfArray(array)

  const fromRow = cloneElements.find((_, index) => index === fromRowIndex) // suppose row1
  const toRow = cloneElements.find((_, index) => index === toRowIndex) // suppose row2

  if (fromRow && toRow) {
    // if row1 & row2 have children
    if (fromRow.children && toRow.children) {
      // push new children from row1 to row2 and update actionState
      toRow.children.push({
        ...fromRow.children[elementIndex],
        actionState: `tagFromRow-${toRowIndex}`,
      })

      // delete element from row1
      fromRow.children.splice(elementIndex, 1)

      // update main array
      cloneElements[fromRowIndex] = fromRow
      cloneElements[toRowIndex] = toRow

      return cloneElements
    } else if (fromRow.children) {
      // create new children from row1 to row2 and update actionState
      toRow.children = [
        {
          ...fromRow.children[elementIndex],
          actionState: `tagFromRow-${toRowIndex}`,
        },
      ]

      // delete element from row1
      fromRow.children.splice(elementIndex, 1)

      // update main array
      cloneElements[fromRowIndex] = fromRow
      cloneElements[toRowIndex] = toRow

      return cloneElements
    }
  }

  return array
}

export const sortRowElement = (
  rowIndex: number,
  dragItem: number,
  dropItem: number,
  array: IElement[]
) => {}

export const removeBodyElement = (elementIndex: number, array: IElement[]) => {
  return array.filter((_, index) => index !== elementIndex)
}
