interface IElement {
  type: string // html tag type
  width: number // width: 100%
  dndItemType: string
  children?: IElement[]
}

/* Drag & Drop Item Types
  1. sidebar
  2. body
  3. row
  4. 

*/

export default IElement
