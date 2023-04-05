import React from 'react'
import NotDoneTaskBox from './NotDoneTaskBox'
import { useDrop } from 'react-dnd'
import ItemTypes from '../utils/itemTypes'
import DoneTaskBox from './DoneTaskBox'

interface Props {
  tasks: Task[]
  completeTask: (id: number) => void
}

const DoneTasks: React.FC<Props> = ({ tasks, completeTask }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item: { id: number }) => {
      completeTask(item.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  return (
    <div
      className={`${
        isOver ? 'bg-blue-500' : 'bg-blue-300'
      } w-[600px] p-3 flex flex-row gap-2 items-start flex-wrap`}
      ref={dropRef}
    >
      {/* <h3 className='text-xl font-bold'>Done</h3> */}

      {tasks
        .filter((task) => task.status === 'done')
        .map((task) => (
          <DoneTaskBox key={task.id} task={task} />
        ))}
    </div>
  )
}

export default DoneTasks
