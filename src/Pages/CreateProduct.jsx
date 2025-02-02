import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, CircularProgress, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createProduct, GetAllCategories } from '../Redux/Slices/CreateProductSlice';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';

const CreateProduct = () => {
    const dispatch = useDispatch();
    const { loading, successMessage, error, done, categories } = useSelector((state) => state.createProduct);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        description: Yup.string().required('Description is required'),
        image: Yup.string().url('Invalid URL').required('Image URL is required'),
        category: Yup.string().required('Category is required'),
    });

    useEffect(() => {
        dispatch(GetAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            setCategoriesLoading(false);
        }
    }, [categories]);

    const handleSubmit = (values, { resetForm }) => {
        dispatch(createProduct(values));
        resetForm();
    };

    useEffect(() => {
        if (done) {
            toast.success(successMessage);
        }
        if (error) {
            toast.error(error);
        }
    }, [successMessage, error, done]);

    return (
        <div className='sm:bg-gray-200 bg-white min-h-screen flex justify-center items-center'>
            {categoriesLoading ? (
                <div className="flex justify-center items-center absolute inset-0 z-10">
                    <CircularProgress size={50} />
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='w-full h-full flex justify-center items-center bg-opacity-60 z-10'
                >
                    <div className='bg-white p-10 rounded-lg sm:shadow-lg w-full lg:w-1/2'>
                        <h1 className='text-4xl font-pbold text-center mb-8'>Create a New Product</h1>
                        <Formik
                            initialValues={{
                                title: '',
                                price: '',
                                description: '',
                                image: '',
                                category: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, setFieldValue, values }) => (
                                <Form className='flex flex-col'>
                                    <div className="mb-4">
                                        <Field
                                            as={TextField}
                                            name="title"
                                            label="Product Title"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.title && !!errors.title}
                                            helperText={touched.title && errors.title}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Field
                                            as={TextField}
                                            name="price"
                                            label="Price"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.price && !!errors.price}
                                            helperText={touched.price && errors.price}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Field
                                            as={TextField}
                                            name="description"
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={3}
                                            error={touched.description && !!errors.description}
                                            helperText={touched.description && errors.description}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Field
                                            as={TextField}
                                            name="image"
                                            label="Image URL"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.image && !!errors.image}
                                            helperText={touched.image && errors.image}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <FormControl fullWidth error={touched.category && !!errors.category}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                name="category"
                                                value={values.category}
                                                onChange={(e) => setFieldValue('category', e.target.value)}
                                                label="Category"
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem className='font-pbold' key={category} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {touched.category && errors.category && (
                                                <FormHelperText>{errors.category}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={loading}
                                        sx={{ marginTop: 'auto' }}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Create Product'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </motion.div>
            )}
            <ToastContainer />
        </div>
    );
};

export default CreateProduct;
