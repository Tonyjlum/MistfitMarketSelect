import React from 'react'

const Item = (props) => {
  const {item} = props
  return (
    <div
      onClick={() => props.updateSelectedItem(item.id, item.product)}
      className={`items ${(props.currentItemId === item.id ? "selected" : "")}`}
    >
      {`${item.product} : $${item.price}`}
    </div>
  )

}
export default Item
