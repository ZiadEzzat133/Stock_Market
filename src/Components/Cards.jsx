import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/Slices/ProductSlice';
import Card from '../Components/Card';
import { CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const Cards = () => {
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.products);

    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('priceasc');
    const [sortedProducts, setSortedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noproducts, setNoProducts] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        if (products.length === 0) {
            setIsLoading(true);
            const products = dispatch(fetchProducts());
            setIsLoading(false);
            if (products.length === 0) {
                setNoProducts(true);
            }
        }
    }, [dispatch, products]);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            let sorted = [...products];
            if (sortBy === 'priceasc') {
                sorted.sort((a, b) => a.price - b.price);
            }
            else if (sortBy === 'pricedesc') {
                sorted.sort((a, b) => b.price - a.price);
            }
            else if (sortBy === 'category') {
                sorted.sort((a, b) => a.category.localeCompare(b.category));
            }
            setSortedProducts(sorted);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [products, sortBy]);

    // Paginate products
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => prev + direction);
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="flex justify-between mb-4">
                <div className="flex md:flex-row flex-col md:items-center gap-10 justify-center w-full mt-5 px-2">
                    <FormControl className="flex-1" variant="outlined">
                        <InputLabel id="sort-by-label">Sort By</InputLabel>
                        <Select
                            labelId="sort-by-label"
                            id="sort-by"
                            value={sortBy}
                            onChange={handleSortChange}
                            label="Sort By"
                        >
                            <MenuItem value="priceasc">Price Ascending</MenuItem>
                            <MenuItem value="pricedesc">Price Descending</MenuItem>
                            <MenuItem value="category">Category</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='flex items-center gap-x-2'>
                        <button
                            onClick={() => handlePageChange(-1)}
                            disabled={currentPage === 1}
                            className={`hover:cursor-pointer ${currentPage === 1 ? 'bg-gray-500' : 'bg-blue-500 '} text-white px-2 py-2 h-12 rounded-md w-12 flex items-center justify-center`}
                        >
                            <FaAngleLeft />
                        </button>
                        {Array.from({ length: Math.ceil(sortedProducts.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`hover:cursor-pointer ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} px-2 py-2 font-psbold w-12 h-12  rounded-md`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage * itemsPerPage >= sortedProducts.length}
                            className={`hover:cursor-pointer ${currentPage * itemsPerPage >= sortedProducts.length ? 'bg-gray-500' : 'bg-blue-500 '} text-white px-2 py-2 rounded-md h-12 w-12 flex items-center justify-center`}
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <CircularProgress />
                </div>
            ) :
                noproducts ? (<div className="flex justify-center font-pbold text-3xl items-center h-96">No products found</div>) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5 p-2">
                        {paginatedProducts.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.8,
                                }}
                            >
                                <Card
                                    id={item.id}
                                    title={item.title}
                                    category={item.category}
                                    price={item.price}
                                    image={item.image}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default Cards;
