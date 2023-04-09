import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {} from 'react-dnd'
import ItemTypes from '../utils/itemTypes'

interface Props {
  task: Task
  index: number
}

const NotDoneTaskBox: React.FC<Props> = ({ task, index }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: {
      id: task.id,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [, dropRef] = useDrop<Task>(() => ({
    accept: ItemTypes.CARD,
    hover: (item, monitor) => {
      // console.log(item)
      if (!ref.current) {
        return
      }
      const dragIndex = 0
      const hoverIndex = index

      // Don't replace items with themselves
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
    },
  }))

  dragRef(dropRef(ref))

  return (
    <div
      className={`${
        isDragging ? 'bg-gray-200' : 'bg-white'
      } rounded-lg px-4 py-3 text-center`}
      ref={ref}
    >
      <p className='text-lg'>{task.name}</p>
    </div>
  )
}

export default NotDoneTaskBox
