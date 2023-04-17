import shortid from 'shortid'
import { ROW, COLUMN, COMPONENT, ISideBarItem } from '../utils/constant'
import { ILayout } from '../utils/initial-data'

// a little function to help us with reordering the result
export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed) // inserting task in new index

  return result
}

export const remove = <T>(arr: T[], index: number) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // part of the array after the specified index
  ...arr.slice(index + 1),
]

export const insert = <T>(arr: T[], index: number, newItem: ILayout) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
]

export const reorderChildren = (
  children: ILayout[],
  splitDropZonePath: string[],
  splitItemPath: string[]
) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0])
    const itemIndex = Number(splitItemPath[0])
    return reorder(children, itemIndex, dropZoneIndex)
  }

  const updatedChildren = [...children]

  const curIndex = Number(splitDropZonePath.slice(0, 1))

  // Update the specific node's children
  const splitDropZoneChildrenPath = splitDropZonePath.slice(1)
  const splitItemChildrenPath = splitItemPath.slice(1)
  const nodeChildren = updatedChildren[curIndex]

  if (!nodeChildren.children) throw Error('')
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: reorderChildren(
      nodeChildren.children,
      splitDropZoneChildrenPath,
      splitItemChildrenPath
    ),
  }

  return updatedChildren
}

export const removeChildFromChildren = (
  children: ILayout[],
  splitItemPath: string[]
) => {
  if (splitItemPath.length === 1) {
    const itemIndex = Number(splitItemPath[0])
    return remove(children, itemIndex)
  }

  const updatedChildren = [...children]

  const curIndex = Number(splitItemPath.slice(0, 1))

  // Update the specific node's children
  const splitItemChildrenPath = splitItemPath.slice(1)
  const nodeChildren = updatedChildren[curIndex]

  if (nodeChildren.children) {
    updatedChildren[curIndex] = {
      ...nodeChildren,
      children: removeChildFromChildren(
        nodeChildren.children,
        splitItemChildrenPath
      ),
    }

    return updatedChildren
  }

  return updatedChildren
}

export const addChildToChildren = (
  children: ILayout[],
  splitDropZonePath: string[],
  item: ILayout
) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0])
    return insert(children, dropZoneIndex, item)
  }

  const updatedChildren = [...children]

  const curIndex = Number(splitDropZonePath.slice(0, 1))

  // Update the specific node's children
  const splitItemChildrenPath = splitDropZonePath.slice(1)
  const nodeChildren = updatedChildren[curIndex]
  if (!nodeChildren.children) throw Error(`nodeChildren.children not found`)

  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: addChildToChildren(
      nodeChildren.children,
      splitItemChildrenPath,
      item
    ),
  }

  return updatedChildren
}

export const handleMoveWithinParent = (
  layout: ILayout[],
  splitDropZonePath: string[],
  splitItemPath: string[]
) => {
  return reorderChildren(layout, splitDropZonePath, splitItemPath)
}

export const handleAddColumDataToRow = (layout: ILayout[]) => {
  const layoutCopy = [...layout]
  const COLUMN_STRUCTURE = {
    type: COLUMN,
    id: shortid.generate(),
    children: [],
  }

  return layoutCopy.map((row) => {
    if (row.children && !row.children.length) {
      row.children = [COLUMN_STRUCTURE]
    }
    return row
  })
}

export const handleMoveToDifferentParent = (
  layout: ILayout[],
  splitDropZonePath: string[],
  splitItemPath: string[],
  item: ILayout
) => {
  let newLayoutStructure: ILayout
  const COLUMN_STRUCTURE = {
    type: COLUMN,
    id: shortid.generate(),
    children: [item],
  }

  const ROW_STRUCTURE = {
    type: ROW,
    id: shortid.generate(),
  }

  switch (splitDropZonePath.length) {
    case 1: {
      // moving column outside into new row made on the fly
      if (item.type === COLUMN) {
        newLayoutStructure = {
          ...ROW_STRUCTURE,
          children: [item],
        }
      } else {
        // moving component outside into new row made on the fly
        newLayoutStructure = {
          ...ROW_STRUCTURE,
          children: [COLUMN_STRUCTURE],
        }
      }
      break
    }
    case 2: {
      // moving component outside into a row which creates column
      if (item.type === COMPONENT) {
        newLayoutStructure = COLUMN_STRUCTURE
      } else {
        // moving column into existing row
        newLayoutStructure = item
      }

      break
    }
    default: {
      newLayoutStructure = item
    }
  }

  let updatedLayout = layout
  updatedLayout = removeChildFromChildren(updatedLayout, splitItemPath)
  updatedLayout = handleAddColumDataToRow(updatedLayout)
  updatedLayout = addChildToChildren(
    updatedLayout,
    splitDropZonePath,
    newLayoutStructure
  )

  return updatedLayout
}

export const handleMoveSidebarComponentIntoParent = (
  layout: ILayout[],
  splitDropZonePath: string[],
  item: ISideBarItem
) => {
  let newLayoutStructure: ILayout
  switch (splitDropZonePath.length) {
    case 1: {
      newLayoutStructure = {
        type: ROW,
        id: shortid.generate(),
        children: [{ type: COLUMN, id: shortid.generate(), children: [item] }],
      }
      break
    }
    case 2: {
      newLayoutStructure = {
        type: COLUMN,
        id: shortid.generate(),
        children: [item],
      }
      break
    }
    default: {
      newLayoutStructure = item
    }
  }

  return addChildToChildren(layout, splitDropZonePath, newLayoutStructure)
}

export const handleRemoveItemFromLayout = (
  layout: ILayout[],
  splitItemPath: string[]
) => {
  return removeChildFromChildren(layout, splitItemPath)
}
