import classNames from 'classnames'
import React, { useContext } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import ItemTypes from '../../utils/itemTypes'
import { context } from '../../pages/FormBuilder'
import Element from './Element'
import IElement from '../../interface/Element'
import { rowToBody, sideBarToBody } from '../../function/helpers'

type DropItem = { element: IElement; index: number } | IElement

const Body: React.FC = () => {
  const { elements, setElements } = useContext(context)
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: [
      ItemTypes.tagFromSideBar,
      ItemTypes.tagFromRow,
      ItemTypes.tagFromBody,
      ItemTypes.tagFromElement,
    ],
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        didDrop: monitor.didDrop(),
      }
    },
    drop: (item: DropItem, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop()

      // item will dropped in row. If this condition return true
      if (didDrop) {
        return
      }

      // place element in last of the body
      else {
        setElements((prevState) => {
          if ('element' in item) {
            if (item.element.actionState.startsWith('tagFromRow')) {
              const rowIndex = parseInt(item.element.actionState.split('-')[1])
              return rowToBody(rowIndex, item.index, prevState)
            }
          } else {
            return sideBarToBody(item, prevState)
          }
          return prevState
        })
      }
    },
  }))

  return (
    <div className='w-full overflow-y-auto p-5 border'>
      <div
        className={classNames(
          'max-w-[1200px] mx-auto h-full overflow-y-auto p-5 transition border-2 border-transparent shadow-lg rounded-xl overflow-x-hidden',
          {
            '!border-blue-500': isOver,
          }
        )}
        ref={dropRef}
      >
        <div className='flex flex-wrap items-start'>
          {elements.map((element, index) => (
            <Element key={index} element={element} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Body
