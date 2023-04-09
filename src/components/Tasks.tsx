import React, { useState } from 'react'
import DoneTasks from './DoneTasks'
import NotDoneTasks from './NotDoneTasks'

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: Math.floor(Math.random() * 1000) + 1,
      name: 'Wash cloths',
      status: 'not-done',
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      name: 'Be Happy',
      status: 'not-done',
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      name: 'Cleanup home',
      status: 'not-done',
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      name: 'Give push ups',
      status: 'not-done',
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      name: 'Meet with mom',
      status: 'done',
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      name: 'Eat some food',
      status: 'done',
    },
  ])

  const completeTask = (id: number) => {
    const task = tasks.filter((task) => task.id === id)
    task[0].status = 'done'
    setTasks((taksList) =>
      taksList.filter((task) => task.id !== id).concat(task)
    )
  }

  const inCompleteTask = (id: number) => {
    const task = tasks.filter((task) => task.id === id)
    task[0].status = 'not-done'
    setTasks((taksList) =>
      taksList.filter((task) => task.id !== id).concat(task)
    )
  }

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const dragCard = tasks[dragIndex]
  }

  return (
    <div className='flex h-[80vh] w-full'>
      <NotDoneTasks tasks={tasks} inCompleteTask={inCompleteTask} />
      <DoneTasks tasks={tasks} completeTask={completeTask} />
    </div>
  )
}

export default Tasks
