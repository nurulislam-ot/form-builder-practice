import React, { useState, createContext } from 'react'
import Sidebar from '../components/form-builder/Sidebar'
import Body from '../components/form-builder/Body'
import IElement from '../interface/Element'

export const context = createContext<{
  elements: IElement[]
  setElements: React.Dispatch<React.SetStateAction<IElement[]>>
}>({
  elements: [],
  setElements: (elements) => {},
})

const FormBuilder: React.FC = () => {
  const [elements, setElements] = useState<IElement[]>([])

  return (
    <context.Provider value={{ elements, setElements }}>
      <div className='flex w-full h-screen'>
        <Sidebar />
        <Body />
      </div>
    </context.Provider>
  )
}

export default FormBuilder
