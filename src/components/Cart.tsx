// import { useState } from 'react';
import CartItem from './CartItem';
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useStore } from "../store/useStore";


const Cart = () => {

    const navigate = useNavigate();
    const cart = useStore((s) => s.cart);
    const totalItems = useStore((s) => s.totalItems()); 
    const totalPrice = useStore((s) => s.totalCostFormatted());
    // const clearCart = useStore((s) => s.clearCart);
    // const [confirm, setConfirm] = useState(false);

    const proceedWithOrder = () => {
        // clearCart();
        navigate("/submit-order");
    }

    return  (
        <main className="p-3! lg:px-20!">
            <ul className='pt-10!'>          
                {cart.map(item => {
                    return (
                        <CartItem item={item} />
                    )
                })}
            </ul>
            <div className="cart__totals text-gray-800">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {totalPrice.toFixed(2)}</p>
                <button
                    disabled={!totalItems} 
                    className="flex justify-end align-middle text-gray-900 hover:text-gray-800 cursor-pointer w-50"
                    onClick={proceedWithOrder}
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