import React, { useState, createContext } from 'react'
import { useDrop } from 'react-dnd'
import classnames from 'classnames'
import { Reorder } from 'framer-motion'
// import update from 'immutability-helper'
import ElementBox, {
  ElementInterface,
} from '../components/form-builder/ElementBox'
import Element from '../components/form-builder/Element'

export const context = createContext<{
  elements: ElementInterface[]
  setElements:
    | React.Dispatch<React.SetStateAction<ElementInterface[]>>
    | undefined
  moveElements: (
    dragIndex: number,
    hoverIndex: number,
    elements: unknown[]
  ) => unknown[]
}>({
  elements: [],
  setElements: undefined,
  moveElements: () => [],
})

const FormBuilder: React.FC = () => {
  const [elements, setElements] = useState<ElementInterface[]>([])
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'fromSidebar',
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      }
    },
    drop: (item: ElementInterface) => {
      setElements((prevState) => prevState.concat([{ ...item }]))
    },
  }))

  function moveElements<T>(
    dragIndex: number,
    hoverIndex: number,
    elements: T[]
  ) {
    const deepCopyElements = [...elements]
    const dragValue = deepCopyElements[dragIndex]
    const hoverValue = deepCopyElements[hoverIndex]
    deepCopyElements.splice(dragIndex, 1, hoverValue)
    deepCopyElements.splice(hoverIndex, 1, dragValue)
    return deepCopyElements
  }

  return (
    <context.Provider value={{ elements, moveElements, setElements }}>
      <div className='flex w-full h-screen'>
        <div className='w-[400px] bg-gray-100 overflow-y-auto border-r p-3 flex flex-col gap-3'>
          <ElementBox type='h1' width={100} dndType='h1/box' />
          <ElementBox type='input' width={25} dndType='input/box' />
          <ElementBox type='p' width={50} dndType='p/box' />
        </div>
        <div className='w-full overflow-y-auto p-5 '>
          <div
            // values={elements}
            // onReorder={setElements}
            // animate={{ scale: isOver ? 1.03 : 0 }}
            className={classnames(
              'max-w-[1200px] mx-auto min-h-[300px] transition flex flex-wrap',
              {
                'bg-slate-200': isOver,
              }
            )}
            ref={dropRef}
          >
            {elements.map((element, index) => (
              <Element key={index} element={element} index={index} />
            ))}
          </div>
        </div>
      </div>
    </context.Provider>
  )
}

export default FormBuilder
