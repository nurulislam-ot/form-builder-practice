import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from '../utils/itemTypes'

const DoneTaskBox: React.FC<{ task: Task }> = ({ task }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: {
      id: task.id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      className={`${
        isDragging ? 'bg-gray-200' : 'bg-white'
      } rounded-lg px-4 py-3 text-center`}
      ref={dragRef}
    >
      <p className='text-lg'>{task.name}</p>
    </div>
  )
}

export default DoneTaskBox
