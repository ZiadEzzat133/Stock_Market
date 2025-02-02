import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import CartItem from '../Components/CartItem';
import NoCart from '../assets/images/NoCart.png';
import Cheque from '../Components/Cheque';
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    return (
        <div>
            <Header />
            <div className='px-6 py-8 mt-8 xl:w-[30%] w-full'>
                <h1 className='text-7xl font-pbold mb-4'>My Cart</h1>
                <p className='text-gray-600 text-lg'>Where you can find all the products you have added to your cart so far and proceed to checkout</p>
            </div>
            <div className="px-6 py-4 flex flex-col gap-4">
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                category={item.category}
                                price={item.price}
                                quantity={item.quantity}
                            />
                        ))}
                        <Cheque />
                    </>
                ) : (
                    <div className='flex flex-col justify-center items-center'>
                        <img src={NoCart} alt="No Cart" />
                        <p className="text-xl font-psbold text-gray-500">Your cart is currently empty.</p>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
