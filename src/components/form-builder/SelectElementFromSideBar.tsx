import React from 'react'
import { useDrag } from 'react-dnd'
import classnames from 'classnames'
import ItemTypes from '../../utils/itemTypes'

export type ELEMENT = 'h1' | 'h2' | 'h3' | 'p' | 'input'
export type WIDTH = 'full' | 'half' | 'quarter'
export type DND = 'h1/box' | 'input/box' | 'p/box'

interface Props {
  type: string
  width: number
}

export interface ElementInterface extends Props {}

const generateTitle = (type: ElementInterface['type']) => {
  return type === 'h1' || type === 'h2' || type === 'h3'
    ? 'Heading'
    : type === 'input'
    ? 'Input'
    : type === 'p'
    ? 'Paragraph'
    : type === 'password'
    ? 'Password'
    : type === 'date'
    ? 'Date'
    : type === 'image'
    ? 'Image'
    : type === 'file'
    ? 'File'
    : type === 'select'
    ? 'SelectBox'
    : 'Unknown'
}

const SelectElementFromSideBar: React.FC<Props> = (props) => {
  const { type } = props
  const [{ isDragging }, dropRef] = useDrag(() => ({
    type: ItemTypes.tagFromSideBar,
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
      <p className='text-gray-600'>Lorem ipsum, dolor sit</p>
    </div>
  )
}

export default SelectElementFromSideBar
