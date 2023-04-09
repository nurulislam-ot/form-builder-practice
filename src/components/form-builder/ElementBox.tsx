import React from 'react'
import { useDrag } from 'react-dnd'
import classnames from 'classnames'

export type ELEMENT = 'h1' | 'h2' | 'h3' | 'p' | 'input'
export type WIDTH = 'full' | 'half' | 'quarter'
export type DND = 'h1/box' | 'input/box' | 'p/box'

interface Props {
  type: ELEMENT
  dndType: DND
  width: number
}

export interface ElementInterface extends Props {}

const generateTitle = (type: ELEMENT) => {
  return type === 'h1'
    ? 'Heading 1'
    : type === 'input'
    ? 'Input'
    : type === 'p'
    ? 'Paragraph'
    : 'Unknown'
}

const ElementBox: React.FC<Props> = (props) => {
  const { type } = props
  const [{ isDragging }, dropRef] = useDrag(() => ({
    type: 'fromSidebar',
    item: props,
    collect(monitor) {
      return { isDragging: monitor.isDragging() }
    },
  }))

  return (
    <div
      className={classnames(
        'w-full border bg-white px-4 py-3 rounded-lg cursor-pointer',
        {
          'opacity-50 cursor-move': isDragging,
        }
      )}
      ref={dropRef}
    >
      <p className='text-lg font-semibold'>{generateTitle(type)}</p>
      <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur</p>
    </div>
  )
}

export default ElementBox
