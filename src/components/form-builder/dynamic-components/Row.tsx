import React, { useContext, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import classNames from 'classnames'
import ItemTypes from '../../../utils/itemTypes'
import IElement from '../../../interface/Element'
import Element from '../Element'
import { context } from '../../../pages/FormBuilder'
import { bodyToRow, rowToRow, sideBarToRow } from '../../../function/helpers'

interface Props {
  element: IElement
  index: number
}

type DropItem = { element: IElement; index: number } | IElement

export const getRowIndex = (rowItemType: string) => {
  return rowItemType.split('-')[1]
}

// Row is an element
const Row: React.FC<Props> = ({ element, index }) => {
  const { setElements } = useContext(context)
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.tagFromRow,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }))
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: [
      ItemTypes.tagFromSideBar,
      ItemTypes.tagFromBody,
      ItemTypes.tagFromElement,
    ],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: DropItem) => {
      setElements((prevState) => {
        // drag from main body
        if ('element' in item) {
          if (item.element.actionState.startsWith('tagFromRow')) {
            const fromRowIndex = parseInt(
              item.element.actionState.split('-')[1]
            )
            const toRowIndex = index
            return rowToRow(item.index, fromRowIndex, toRowIndex, prevState)
          }
          if (item.element.actionState === 'tagFromBody') {
            console.log(index, item)
            return bodyToRow(index, item.index, prevState)
          }
          return prevState
        }

        // drag from sidebar
        else {
          return sideBarToRow(item, index, prevState)
        }
      })
    },
  }))
  dropRef(dragRef(ref))

  return (
    <div
      className={classNames('border', {
        'h-24': 'children' in element === false,
        'border-2 transition border-blue-500': isOver,
      })}
      ref={ref}
    >
      <div className='flex flex-wrap items-start'>
        {element.children &&
          element.children.map((element, index) => (
            <Element key={index} element={element} index={index} />
          ))}
      </div>
    </div>
  )
}

export default Row
