import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails, fetchSimilarProducts } from '../Redux/Slices/ProductDetailsSlice';
import { CircularProgress } from '@mui/material';
import Header from '../Components/Header';
import Card from '../Components/Card';
import { FaStar } from "react-icons/fa";
import { LuStore } from "react-icons/lu";

const ProductDetails = () => {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const numericId = parseInt(id, 10); // Convert to number
    const dispatch = useDispatch();
    const { product, loading, error, similarProducts, similarProductsLoading } = useSelector((state) => state.productDetails);
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!token) {
            window.location.href = '/signin';
            return;
        }
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isInCart = cart.find((item) => item.id === numericId);
        if (!isInCart) {
            const newItem = { id: numericId, image: product.image, title: product.title, category: product.category, price: product.price, quantity };
            localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
            setAddedToCart(true);
        } else {
            const updatedCart = cart.filter((item) => item.id !== numericId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setAddedToCart(false);
        }
    };

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isInCart = cart.find((item) => item.id === numericId);
        if (isInCart) {
            setAddedToCart(true);
            setQuantity(isInCart.quantity);
        }
    }, [numericId]);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (product?.category) {
            dispatch(fetchSimilarProducts(product.category));
        }
    }, [dispatch, product?.category]);

    if (loading || similarProductsLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="mx-auto pt-2">
            <Header dark={false} />
            {product ? (
                <div className="flex flex-col gap-10 mt-10">
                    <div className="flex flex-col md:flex-row items-center gap-12 px-12">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-96 h-96 object-contain"
                        />
                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl font-bold">{product.title}</h1>
                            <p className="text-gray-500 text-lg">{product.description}</p>
                            <div>
                                <p className="text-lg text-gray-500 capitalize">
                                    {product.category}
                                </p>
                                <p className="text-lg text-gray-500 mb-2">
                                    EGP {product.price.toFixed(2)}
                                </p>
                                <p className="text-lg text-gray-600 flex items-center gap-2">
                                    <FaStar className="text-yellow-400" />
                                    <span>{product.rating.rate}</span> | <span>{product.rating.count} ratings</span>
                                </p>
                                <div className="mt-8 flex gap-4 lg:flex-row flex-col">
                                    <button
                                        onClick={handleAddToCart}
                                        className={`hover:cursor-pointer md:w-72 w-full ${addedToCart ? 'bg-red-600' : 'bg-blue-700'} ${addedToCart ? 'hover:bg-red-900' : 'hover:bg-blue-900'} rounded-sm text-white transition duration-300 font-medium px-8 py-3`}
                                    >
                                        {addedToCart ? 'Remove from Cart' : 'Add to Cart'}
                                    </button>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="bg-blue-700 flex justify-center items-center gap-3 hover:cursor-pointer md:w-72 w-full hover:bg-blue-900 rounded-sm text-white transition duration-300 font-medium px-8 py-3"
                                    >
                                        <LuStore className="text-xl" />
                                        Back to Products
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 px-6">
                        <hr className="text-gray-300" />
                    </div>
                    <div className="mt-8 px-6">
                        <h2 className="text-5xl font-pbold mb-6">Similar Products</h2>
                        {similarProductsLoading ? (
                            <div className="flex justify-center items-center">
                                <CircularProgress />
                            </div>
                        ) : similarProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {similarProducts.map((similarProduct) => (
                                    <Card
                                        key={similarProduct.id}
                                        id={similarProduct.id}
                                        image={similarProduct.image}
                                        title={similarProduct.title}
                                        category={similarProduct.category}
                                        price={similarProduct.price}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No similar products found.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Product not found.</p>
            )}
        </div>
    );
};

export default ProductDetails;
