import React, { useState, useEffect } from 'react';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";

const Card = ({ id, image, title, category, price }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isInCart = cart.find((item) => item.id === id);
        if (isInCart) {
            setAddedToCart(true);
            setQuantity(isInCart.quantity);
        }
    }, [id]);

    const handleAddToCart = () => {
        if (!token) {
            window.location.href = '/signin';
            return;
        }
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!addedToCart) {
            const newItem = { id, image, title, category, price, quantity };
            localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
            setAddedToCart(true);
        } else {
            const updatedCart = cart.filter((item) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setAddedToCart(false);
        }
    };

    const increment = () => {
        // if (addedToCart) return;

        setQuantity((prev) => {
            const newQuantity = prev + 1;
            updateLocalStorage(newQuantity);
            return newQuantity;
        });
    };

    const decrement = () => {
        if (quantity === 1) return;

        setQuantity((prev) => {
            const newQuantity = prev - 1;
            updateLocalStorage(newQuantity);
            return newQuantity;
        });
    };

    const updateLocalStorage = (newQuantity) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('localStorageChange'));
    };

    return (
        <div className='bg-white shadow-lg rounded-lg p-4 w-auto md:w-auto hover:bg-gray-100 hover:cursor-pointer duration-500'>
            <img src={image} alt="Product" className='w-full h-80 object-contain rounded-lg' />
            <div className='flex flex-col justify-between mt-4 gap-2'>
                <h3 className='text-2xl font-pbold line-clamp-1'>{title}</h3>
                <h2 className='text-lg font-psbold capitalize'>{category}</h2>
                <div className='flex justify-between items-center mt-2'>
                    <h3 className='text-xl font-pbold'>EGP {price}</h3>
                    <button
                        onClick={handleAddToCart}
                        className={`bg-gray-900 hover:cursor-pointer rounded-full text-white px-4 py-2 transition-all duration-300 `}>
                        <MdOutlineAddShoppingCart className={`text-2xl transform transition-all duration-300 ${addedToCart ? 'text-blue-400' : 'text-white'}`} />
                    </button>
                </div>
                <div className='flex justify-center gap-x-20 items-center mt-2'>
                    <button>
                        <FiMinus className='hover:cursor-pointer' onClick={decrement} />
                    </button>
                    <h3 className='text-xl font-pm'>{quantity}</h3>
                    <button>
                        <FaPlus className='hover:cursor-pointer' onClick={increment} />
                    </button>
                </div>
                <button
                    onClick={() => window.location.href = `/productdetails/${id}`}
                    className='bg-gray-300 mt-2 w-full hover:cursor-pointer duration-300 transform transition-colors font-pm px-8 py-2 rounded-full'>
                    View Item Details
                </button>
            </div>
        </div>
    );
};

export default Card;
