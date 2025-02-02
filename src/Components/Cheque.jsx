import React, { useEffect, useState } from 'react';

const Cheque = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const updateCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        const total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            updateCart();
        };

        window.addEventListener('localStorageChange', handleStorageChange);

        window.addEventListener('storage', handleStorageChange);

        updateCart();

        return () => {
            window.removeEventListener('localStorageChange', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="bg-gray-100 w-full xl:w-1/2 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-pbold mb-4">Cheque</h2>
            <ul className="space-y-2">
                {cart.map((item, index) => (
                    <li key={index} className="flex justify-between text-gray-800">
                        <span className='max-w-1/2 font-pm'>{item.quantity} x {item.title}</span>
                        <span className='font-pm'>EGP {(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="border-t mt-4 pt-4 flex justify-between font-bold text-gray-900">
                <span className='font-pm'>Total:</span>
                <span className='font-pm'>EGP {totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default Cheque;