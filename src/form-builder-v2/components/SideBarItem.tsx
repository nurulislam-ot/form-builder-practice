import React from 'react'
import { useDrag } from 'react-dnd'
import { IComponent } from '../utils/initial-data'

interface Props {
  data: IComponent
}
const SideBarItem: React.FC<Props> = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    type: '',
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  return (
    <div className='sideBarItem' ref={drag} style={{ opacity }}>
      {data.component.type}
    </div>
  )
}
export default SideBarItem
