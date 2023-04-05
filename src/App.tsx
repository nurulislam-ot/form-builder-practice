import { useState } from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './utils/itemTypes'
import Tasks from './components/Tasks'

function App() {
  return (
    <div className='container mx-auto px-20'>
      <h1 className='text-4xl font-bold mb-5'>Task Manager</h1>
      <Tasks />
    </div>
  )
}

export default App
