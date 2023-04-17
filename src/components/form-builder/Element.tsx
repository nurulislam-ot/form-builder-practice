import classnames from 'classnames'
import React, { useContext, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { context } from '../../pages/FormBuilder'
import { moveArray } from '../../function/moveArray'
import IElement from '../../interface/Element'
import Row from './dynamic-components/Row'
import ItemTypes from '../../utils/itemTypes'

// if element placed in body
interface Element {
  element: IElement
  index: number
}

// if element placed in a row.
interface RowElement {
  element: IElement
  index: number
  rowIndex: number
}

type Props = Element | RowElement

const Element: React.FC<Props> = (props) => {
  const { setElements } = useContext(context)
  const ref = useRef<HTMLDivElement>(null)
  // console.log(props)

  const {
    element: { type, width },
    index,
  } = props

  const [{ isDragging }, dragRef, preview] = useDrag(() => ({
    type: ItemTypes.tagFromElement,
    item: { ...props },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: ItemTypes.tagFromElement,
    drop: (dropItem: Props, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = index
      const dropIndex = dropItem.index

      if (dragIndex === dropIndex) {
        return
      }

      // const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // const hoverMiddleY =
      //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // const clientOffset = monitor.getClientOffset()
      // const hoverClientY = clientOffset
      //   ? clientOffset.y - hoverBoundingRect.top
      //   : 0

      // Dragging downwards
      // if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
      //   return
      // }

      // // Dragging upwards
      // if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
      //   return
      // }

      // Time to actually perform the action
      if (setElements) {
        setElements((prevElements) => {
          if ('rowIndex' in dropItem) {
            const deepElements = [...prevElements]
            // 1st step, get the row
            const row = deepElements[index]

            // change the moving index
            if (row.children) {
              const updatedRow = moveArray<IElement>(
                dragIndex,
                dropIndex,
                row.children
              )
              row.children = updatedRow
              deepElements.splice(index, 1, row)

              return deepElements
            }
          } else {
            // that means the element is not children of any row

            return moveArray(dragIndex, dropIndex, prevElements)
          }
          return prevElements
        })
      }
    },
    // canDrop: (item, monitor) => {
    //   if (!ref.current) {
    //     return false
    //   }
    //   const dragIndex = item.index
    //   const hoverIndex = index

    //   if (dragIndex === hoverIndex) {
    //     return false
    //   }

    //   const hoverBoundingRect = ref.current?.getBoundingClientRect()

    //   const hoverMiddleY =
    //     (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    //   const clientOffset = monitor.getClientOffset()

    //   const hoverClientY = clientOffset
    //     ? clientOffset.y - hoverBoundingRect.top
    //     : 0

    //   // Dragging downwards
    //   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //     return false
    //   }

    //   // Dragging upwards
    //   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //     return false
    //   }
    //   return true
    // },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  dragRef(dropRef(ref))

  return (
    <div
      className={classnames('bg-white group transition', {
        'border-2 border-dashed border-blue-600': isDragging,
        'border-2 border-dashed border-red-600': isOver,
      })}
      style={{ width: `${width}%` }}
      ref={ref}
    >
      <div className='p-3'>
        {type === 'h1' ? (
          <div>
            <h1 className='text-3xl font-medium'>Heading</h1>
          </div>
        ) : null}
        {type === 'input' ||
        type === 'date' ||
        type === 'password' ||
        type == 'file' ? (
          <div className='flex flex-col gap-y-1'>
            <label htmlFor={type}>Enter your {type}</label>
            <input
              id={type}
              type={type}
              placeholder={type === 'input' ? 'Write Some Text' : '********'}
              className={classnames(
                'w-full border-2 border-blue-500 px-3 py-2 rounded-lg',
                { 'py-[5px]': type === 'file' }
              )}
            />
          </div>
        ) : null}
        {type === 'p' ? (
          <div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi, iusto molestias ratione magnam eveniet sed aliquam
              quisquam fugit totam asperiores sint amet quod dolores sapiente
              assumenda qui facilis tempore rem?
            </p>
          </div>
        ) : null}
        {type === 'select' ? (
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='select'>Select your option</label>

            <select className='w-full border-2 border-blue-500 px-3 py-2 rounded-lg bg-white'>
              <option value='1'>Option 1</option>
              <option value='2'>Option 2</option>
              <option value='3'>Option 3</option>
            </select>
          </div>
        ) : null}

        {type === 'row' ? <Row element={props.element} index={index} /> : null}
      </div>
    </div>
  )
}

export default Element
