import React, {ReactElement, ChangeEvent, memo} from 'react'
import { CartItemType } from '../context/CartProvider'
import { ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from '../context/CartProvider'

type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
  
}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {

    const img = item.image || "https://placehold.co/400x400?text=No+Image";
    const lineTotal: number = (item.qty * item.price)
    const highestQty: number = 20 > item.qty ? 20 : item.qty
    const optyionValues: number[] = [...Array(highestQty).keys()].map(i => i+1)
    const options: ReactElement[] = optyionValues.map(val => {
        return (
            <option key={`opt${val}`} value={val}>{val}</option>
        )
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: {...item, qty: Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content = (
<li className="cart__item border-b border-gray-200 py-3 flex flex-col md:grid md:grid-cols-[80px_2fr_1fr_70px_1fr_40px] md:items-center md:gap-4 mb-2!">

  <div className="w-20 h-20 mb-3 md:mb-0 flex items-center justify-center overflow-hidden rounded-md bg-gray-50 self-center">
    <img
      src={img}
      alt={item.name}
      className="w-full h-full object-cover"
    />
  </div>

  <div className="text-sm font-medium text-gray-800 text-center md:text-left truncate">
    {item.name}
  </div>


  <div className="text-gray-600 text-sm text-center">
    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
  </div>

  <div className="flex justify-center">
    <select
      name="itemQty"
      id="itemQty"
      value={item.qty}
      className="border border-gray-300 rounded p-1 text-sm w-14 text-center"
      aria-label="Item Quantity"
      onChange={onChangeQty}
    >
      {options}
    </select>
  </div>

  <div className="text-gray-800 font-semibold text-sm text-center">
    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lineTotal)}
  </div>

  <button
    className="text-red-600 hover:text-red-800 text-lg self-center mt-2 md:mt-0"
    aria-label="Remove Item From Cart"
    title="Remove Item From Cart"
    onClick={onRemoveFromCart}
  >
    ❌
  </button>
</li>


    )

  return content;
}

function areItemsEqual({item: prevItem}: PropsType, {item: nextItem}: PropsType){
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}


const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default MemoizedCartLineItem