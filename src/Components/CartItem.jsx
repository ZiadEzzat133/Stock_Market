import React, { useEffect, useState } from 'react';
import { FiPlus, FiMinus } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CartItem = ({ id, image, title, category, price, quantity }) => {
    const [Quantity, setQuantity] = useState(quantity);
    const [TotalPrice, setTotalPrice] = useState(price * quantity);
    const [openModal, setOpenModal] = useState(false);
    const updateLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event('localStorageChange'));
    };
    const increment = () => {
        setQuantity((prev) => prev + 1);
        setTotalPrice((prev) => prev + price);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isInCart = cart.find((item) => item.id === id);
        if (isInCart) {
            isInCart.quantity += 1;
            updateLocalStorage('cart', cart);
        }
    };

    const decrement = () => {
        if (Quantity === 1) {
            return;
        }
        setQuantity((prev) => prev - 1);
        setTotalPrice((prev) => prev - price);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isInCart = cart.find((item) => item.id === id);
        if (isInCart) {
            isInCart.quantity -= 1;
            updateLocalStorage('cart', cart);
        }

    };

    const handleDelete = () => {
        setOpenModal(true);
    };
    const confirmDelete = () => {
        setOpenModal(false);
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload();
    };

    const cancelDelete = () => {
        setOpenModal(false);
    };

    return (
        <>
            <div className='w-full h-auto bg-gray-100 rounded-xl gap-y-14 grid lg:grid-cols-4 grid-cols-1 px-4 py-4 items-center'>
                <div className='flex gap-x-3 '>
                    <img src={image} alt='product' className='w-28 h-28 object-contain rounded-lg' />
                    <div className='flex flex-col gap-y-1'>
                        <p className='text-lg font-psbold'>{title}</p>
                        <p className='text-md font-pm capitalize'>{category}</p>
                        <p className='text-lg lg:hidden flex font-psbold'>EGP {price}</p>
                    </div>
                </div>

                <div className='lg:justify-center hidden lg:flex'>
                    <p className='text-lg font-psbold '>EGP {price.toFixed(2)}</p>
                </div>

                <div className='flex lg:justify-center items-center gap-x-8'>
                    <button className='flex gap-x-2' onClick={decrement}>
                        <FiMinus className='text-2xl hover:cursor-pointer' />
                    </button>
                    <p className='text-lg font-psbold'>{Quantity}</p>
                    <button className='flex gap-x-2' onClick={increment}>
                        <FiPlus className='text-xl hover:cursor-pointer' />
                    </button>
                </div>

                <div className='flex lg:justify-center items-center justify-between lg:gap-x-40'>
                    <p className='text-lg font-psbold'>EGP {TotalPrice.toFixed(2)}</p>
                    <button className='flex gap-x-2' onClick={handleDelete}>
                        <AiFillDelete className='text-2xl hover:cursor-pointer text-red-600' />
                    </button>
                </div>
            </div>

            <Dialog open={openModal} onClose={cancelDelete}>
                <DialogTitle className='' sx={{ color: 'red', fontSize: '1.7rem' }}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p className='text-xl font-pmedium'>Are you sure you want to delete this item?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CartItem;
