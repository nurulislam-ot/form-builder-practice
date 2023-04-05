import React from 'react'
import NotDoneTaskBox from './NotDoneTaskBox'
import { useDrop } from 'react-dnd'
import ItemTypes from '../utils/itemTypes'

interface Props {
  tasks: Task[]
  inCompleteTask: (id: number) => void
}

const NotDoneTasks: React.FC<Props> = ({ tasks, inCompleteTask }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: { id: number }) => {
      inCompleteTask(item.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  return (
    <div
      className={`${
        isOver ? 'bg-green-300' : 'bg-green-500'
      } w-[200px] p-3 flex flex-col gap-2`}
      ref={dropRef}
    >
      {/* <h3 className='text-xl font-bold'>Not Done</h3> */}
      {tasks
        .filter((task) => task.status === 'not-done')
        .map((task) => (
          <NotDoneTaskBox key={task.id} task={task} />
        ))}
    </div>
  )
}

export default NotDoneTasks
