import React, { useContext, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import classNames from 'classnames'
import ItemTypes from '../../../utils/itemTypes'
import IElement from '../../../interface/Element'
import Element from '../Element'
import { context } from '../../../pages/FormBuilder'
import { bodyToRow, sideBarToRow } from '../../../function/helpers'

interface Props {
  element: IElement
  index: number
}

export const getRowIndex = (rowItemType: string) => {
  return rowItemType.split('-')[1]
}

// Row is an element
const Row: React.FC<Props> = ({ element, index }) => {
  const { setElements } = useContext(context)
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: `${ItemTypes.tagFromRow}-${index}`,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }))
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: [ItemTypes.tagFromSideBar, ItemTypes.tagFromBody],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: IElement | Props) => {
      console.log(item)
      setElements &&
        setElements((prevState) => {
          const cloneArray = [...prevState]

          // drag from main body
          if ('index' in item) {
            // if (item.element.dndItemType.startsWith('row')) {
            // }
            // cloneArray[index].children = [
            //   ...(cloneArray[index].children || []),
            //   {
            //     ...item.element,
            //     // change dndItemType value tagFromBody -> tagFromRow-{index}
            //     dndItemType: `${ItemTypes.tagFromRow}-${index}`,
            //   },
            // ]
            return bodyToRow(index, item.index, prevState)
          }

          // drag from sidebar
          else {
            // cloneArray[index].children = [
            //   ...(cloneArray[index].children || []),
            //   {
            //     ...item,
            //     // change dndItemType value tagFromSidebar -> tagFromRow-{index}
            //     dndItemType: `${ItemTypes.tagFromRow}-${index}`,
            //   },
            // ]
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
