import classNames from 'classnames'
import React, { useContext, useEffect, useRef } from 'react'
import { motion, Reorder } from 'framer-motion'
import { useDrag, useDrop } from 'react-dnd'

import { ElementInterface } from './ElementBox'
import { context } from '../../pages/FormBuilder'

interface Props {
  element: ElementInterface
  index: number
}

const Element: React.FC<Props> = ({ ...props }) => {
  const { element, index } = props
  const { moveElements, elements, setElements } = useContext(context)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('useEffect', elements)
  }, [elements])

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'self',
    item: { ...props },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  }))

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: 'self',
    hover: (item: Props, monitor) => {},
    drop: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      console.log(elements)

      const newElements = moveElements(dragIndex, hoverIndex, [...elements])
      if (setElements) setElements(newElements as ElementInterface[])

      item.index = hoverIndex
    },
    canDrop: (item, monitor) => {
      if (!ref.current) {
        return false
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return false
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return false
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return false
      }
      return true
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      didDrop: monitor.didDrop(),
    }),
  }))

  dragRef(dropRef(ref))

  return (
    <motion.div
      animate={{
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={ref}
      className={classNames('p-3 transition', {
        'border-2 border-dashed border-indigo-400': canDrop,
      })}
      style={{ width: `${element.width}%` }}
    >
      {/* <Reorder.Item value={element}> */}
      <div className={classNames('p-2 border-2 rounded-lg border-orange-400')}>
        {element.type === 'h1' ? (
          <h1 className='text-3xl font-bold'>Heading 1</h1>
        ) : null}
        {element.type === 'input' ? (
          <input
            type='text'
            className='w-full border-2 border-blue-500 px-3 py-2 rounded-lg'
          />
        ) : null}
        {element.type === 'p' ? (
          <p className='w-full'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            iusto molestias ratione magnam eveniet sed aliquam quisquam fugit
            totam asperiores sint amet quod dolores sapiente assumenda qui
            facilis tempore rem?
          </p>
        ) : null}
      </div>
      {/* </Reorder.Item> */}
    </motion.div>
  )
}

export default Element
