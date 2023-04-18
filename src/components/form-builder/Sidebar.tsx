import React, { useState } from 'react'
import SelectElementFromSideBar from './SelectElementFromSideBar'
import IElement from '../../interface/Element'
import ItemTypes from '../../utils/itemTypes'

const Sidebar: React.FC = () => {
  const [sideBarElements] = useState<IElement[]>([
    { type: 'h1', width: 100, actionState: ItemTypes.tagFromSideBar },
    { type: 'p', width: 50, actionState: ItemTypes.tagFromSideBar },
    { type: 'input', width: 25, actionState: ItemTypes.tagFromSideBar },
    { type: 'file', width: 25, actionState: ItemTypes.tagFromSideBar },
    { type: 'select', width: 25, actionState: ItemTypes.tagFromSideBar },
    { type: 'password', width: 25, actionState: ItemTypes.tagFromSideBar },
    { type: 'date', width: 25, actionState: ItemTypes.tagFromSideBar },
    { type: 'row', width: 100, actionState: ItemTypes.tagFromSideBar },
  ])

  return (
    <div className='w-[400px] bg-gray-100 overflow-hidden border-r p-3 '>
      <div className='grid grid-cols-1 gap-2 items-start h-min'>
        {sideBarElements.map((sideBarElement, index) => (
          <SelectElementFromSideBar
            key={index}
            type={sideBarElement.type}
            width={sideBarElement.width}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
