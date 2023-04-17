import IElement from '../interface/Element'
export const sideBarToBody = (element: IElement, array: IElement[]) => {
  array.push(element)

  return array
}

export const sideBarToRow = (
  element: IElement,
  rowIndex: number,
  array: IElement[]
) => {
  const cloneArray = [...array]
  const row = cloneArray.find((_, index) => index === rowIndex)
  if (row) {
    if (row.children) {
      row.children.push(element)
    } else {
      row.children = [element]
    }
  }

  return cloneArray
}

export const bodyToRow = (
  rowIndex: number,
  elementIndex: number,
  array: IElement[]
) => {
  const row = array.find((_, index) => index === rowIndex)
  if (row) {
    if (row.children) {
      row.children.concat(array[elementIndex])
      array.splice(elementIndex, 1)
      array.splice(rowIndex, 1, row)
    } else {
      row.children = [array[elementIndex]]
      array.splice(elementIndex, 1)
      array.splice(rowIndex, 1, row)
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
