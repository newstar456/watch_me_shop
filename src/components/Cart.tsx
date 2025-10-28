import useCart from '../hooks/useCart';
import CartLineItem from './CartLineItem';
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Cart = () => {

    const navigate = useNavigate();
    const {dispatch, REDUCER_ACTIONS, totalItems, totalCost, cart} = useCart();

    return  (
        <main className="p-3! lg:px-20!">
            <ul className='pt-10!'>          
                {cart.map(item => {
                    return (
                        <CartLineItem
                            key={item.sku}
                            item={item}
                            dispatch={dispatch}
                            REDUCER_ACTIONS={REDUCER_ACTIONS}
                        />
                    )
                })}
            </ul>
            <div className="cart__totals text-gray-800">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalCost}</p>
                <button
                    disabled={!totalItems} 
                    className="flex justify-end align-middle text-gray-900 hover:text-gray-800 cursor-pointer w-50"
                    onClick={() => navigate("/submit-order")} 
                >
                    Place Order
                    <span className='w-2 block'></span>
                    <ArrowRight className="w-6! h-6!" />
                </button>
            </div>
        </main>
    )       
}

export default Cart;