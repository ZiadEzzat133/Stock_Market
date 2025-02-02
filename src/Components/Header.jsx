import React, { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Logo from '../assets/images/logo-updated.png';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Header = ({ dark }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const token = localStorage.getItem('token');
    const cancelDelete = () => {
        setShowLogoutModal(false);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className='relative z-10 px-6 py-4 flex justify-between items-center'>
            {/* Logo and Brand Name */}
            <a href="/" className='flex items-center gap-2'>
                <div className={`w-12 h-12 rounded-full border-2 ${dark ? 'border-gray-100' : 'border-black'} flex items-center justify-center overflow-hidden`}>
                    <img src={Logo} alt='logo' className={`w-full h-full ${dark ? '' : 'invert'} object-cover`} />
                </div>
                <h1 className={`text-3xl font-psbold ${dark ? 'text-white' : 'text-black'}`}>Markety</h1>
            </a>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-4'>
                <button onClick={() => window.location.href = '/cart'} className={`flex items-center justify-center ${dark ? 'text-white' : 'text-black'} px-8 py-2 rounded-full font-pbold gap-x-2 duration-200 hover:cursor-pointer`}>
                    <FaShoppingCart className={`${dark ? 'text-white' : 'text-black'} text-2xl hover:cursor-pointer`} />
                    My Cart
                </button>
                <button
                    onClick={() => {
                        if (token) {
                            setShowLogoutModal(true);
                        } else {
                            window.location.href = '/signin';
                        }
                    }}
                    className='bg-gray-100 hover:cursor-pointer hover:bg-gray-200 duration-300 transform transition-colors font-pm px-8 py-2 rounded-full'>
                    {token ? 'Log Out' : 'Log In'}
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className='md:hidden text-3xl hover:cursor-pointer'
                onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes className={`${dark ? 'text-white' : 'text-black'}`} /> : <FaBars className={`${dark ? 'text-white' : 'text-black'}`} />}
            </button>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-20 transform transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                <button
                    onClick={() => setMenuOpen(false)}
                    className='absolute top-4 right-4 text-3xl text-black hover:cursor-pointer'>
                    <FaTimes />
                </button>
                <div className='flex flex-col items-center gap-6 '>
                    <button onClick={() => window.location.href = '/cart'} className='text-black text-xl font-pbold flex items-center gap-2 hover:cursor-pointer'>
                        <FaShoppingCart />
                        My Cart
                    </button>
                    <button
                        onClick={() => {
                            setMenuOpen(false);
                            if (token) {
                                setShowLogoutModal(true); // Show logout modal
                            } else {
                                window.location.href = '/signin';
                            }
                        }}
                        className='text-black text-xl font-pm bg-gray-200 hover:cursor-pointer hover:bg-gray-300 duration-300 transform transition-colors px-8 py-2 rounded-full'>
                        {token ? 'Log Out' : 'Log In'}
                    </button>
                </div>
            </div>

            <Dialog open={showLogoutModal} onClose={cancelDelete}>
                <DialogTitle className='' sx={{ color: 'red', fontSize: '1.7rem' }}>Confirm Logout</DialogTitle>
                <DialogContent>
                    <p className='text-xl font-pmedium'>Are you sure you want to logout?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="secondary">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Header;