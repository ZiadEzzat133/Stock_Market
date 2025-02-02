import React from 'react';
import { Link } from 'react-router-dom';
import Cover from '../assets/images/back2.jpg';
import { TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/Slices/authSlice.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('* Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('* Password is required'),
        username: Yup.string()
            .required('* Username is required'),
        name: Yup.object({
            firstname: Yup.string().required('* First name is required'),
            lastname: Yup.string().required('* Last name is required'),
        }),
        address: Yup.object({
            city: Yup.string().required('* City is required'),
            street: Yup.string().required('* Street is required'),
            number: Yup.number().required('* House number is required'),
        }),
        phone: Yup.string().required('* Phone number is required'),
    });

    return (
        <div className="grid grid-cols-12 w-full h-screen">
            <div className="lg:col-span-6 col-span-12 flex flex-col items-center justify-center gap-y-5 px-5">
            <ToastContainer />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='w-full flex flex-col gap-y-5 items-center justify-center'>
                    <h1 className="text-5xl font-pbold">Create a new Account</h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            username: '',
                            name: { firstname: '', lastname: '' },
                            address: { city: '', street: '', number: '', zipcode: '12926-3874', geolocation: { lat: '-37.3159', long: '81.1496' } },
                            phone: '01027873710',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const resultAction = await dispatch(registerUser(values)).unwrap();
                                toast.success('User created successfully!');
                            } catch (error) {
                                toast.error(error || 'Failed to create user!');
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="flex flex-col mt-5 space-y-4 w-full max-w-lg">
                                <div>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        type="email"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                    />
                                </div>

                                <div>
                                    <Field
                                        as={TextField}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                    />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="username"
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.username && !!errors.username}
                                        helperText={touched.username && errors.username}
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Field
                                            as={TextField}
                                            name="name.firstname"
                                            label="First Name"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.name?.firstname && !!errors.name?.firstname}
                                            helperText={touched.name?.firstname && errors.name?.firstname}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <Field
                                            as={TextField}
                                            name="name.lastname"
                                            label="Last Name"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.name?.lastname && !!errors.name?.lastname}
                                            helperText={touched.name?.lastname && errors.name?.lastname}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Field
                                        as={TextField}
                                        name="address.city"
                                        label="City"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.address?.city && !!errors.address?.city}
                                        helperText={touched.address?.city && errors.address?.city}
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <Field
                                            as={TextField}
                                            name="address.street"
                                            label="Street"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.address?.street && !!errors.address?.street}
                                            helperText={touched.address?.street && errors.address?.street}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <Field
                                            as={TextField}
                                            name="address.number"
                                            label="House Number"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            error={touched.address?.number && !!errors.address?.number}
                                            helperText={touched.address?.number && errors.address?.number}
                                        />
                                    </div>
                                </div>

                                <Button
                                    sx={{
                                        marginTop: '1rem',
                                        height: '3rem',
                                        borderRadius: '1rem',
                                        background: 'linear-gradient(to right, #AF509D, #01A1C7)',
                                    }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <div className="mt-1">
                        <p className="text-sm text-gray-600 font-pr">
                            Already have an account ?{' '}
                            <Link to="/signin" className="text-blue-500 hover:text-blue-700">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
            <div className="lg:col-span-6 col-span-0 hidden w-full lg:block">
                <img
                    src={Cover}
                    alt="Cover"
                    className="w-full h-full max-h-screen object-cover rounded-tl-[4rem] rounded-bl-[4rem] brightness-70"
                />
            </div>

        </div>
    );
};

export default Signup;
