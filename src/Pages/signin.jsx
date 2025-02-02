import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cover from '../assets/images/back2.jpg';
import { TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Redux/Slices/authSlice.js';
import Alert from '@mui/material/Alert';

import { useState } from 'react';
const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    const [ErrorMessage, setErrorMessage] = useState('');
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('* Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('* Password is required'),
    });

    const handleSubmit = async (values) => {
        try {
            const credentials = {
                username: values.username,
                password: values.password,
            };
            const response = await dispatch(loginUser(credentials)).unwrap();
            if (response?.token) {
                localStorage.setItem('token', response.token);
                navigate('/');
            }
        } catch (error) {
            if (error.message === 'Request failed with status code 401') {
                setErrorMessage('Invalid username or password');
            } else {
                setErrorMessage('Something went wrong');
            }
        }
    };

    return (
        <div className="grid grid-cols-12 w-full h-screen">
            <div className="md:col-span-6 col-span-12 flex flex-col items-center justify-center gap-y-5 px-5">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='w-full flex flex-col gap-y-5 items-center justify-center'>
                    <h1 className="text-5xl font-pbold">Login To Your Account</h1>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="flex flex-col mt-5 space-y-4 w-full max-w-lg">
                                <div>
                                    <Field
                                        as={TextField}
                                        name="username"
                                        type="text"
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.username && !!errors.username}
                                        helperText={touched.username && errors.username}
                                    />
                                </div>
                                <div>
                                    <Field
                                        as={TextField}
                                        name="password"
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        error={touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                    />
                                </div>
                                {error && <Alert sx={{fontSize: '1rem'}} severity="error">{ErrorMessage}</Alert>}
                                <Button
                                    sx={{
                                        marginTop: '1rem',
                                        height: '3rem',
                                        borderRadius: '1rem',
                                        background: 'linear-gradient(to right, #AF509D, #01A1C7)',
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging In...' : 'Sign In'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <div className="mt-1">
                        <p className="text-sm text-gray-600 font-pr">
                            Don't have an account ?{' '}
                            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
            <div className="md:col-span-6 col-span-0 hidden w-full md:block">
                <img
                    src={Cover}
                    alt="Cover"
                    className="w-full h-full max-h-screen object-cover rounded-tl-[4rem] rounded-bl-[4rem] brightness-70"
                />
            </div>
        </div>
    );
};

export default Signin;