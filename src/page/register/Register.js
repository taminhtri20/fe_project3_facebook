import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useSnackbar } from 'notistack';

const Register = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        day: '',
        month: '',
        year: '',
        gender: '',
    });

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^(0[1-9])+([0-9]{8})$/;
        return regex.test(phoneNumber);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{6,}$/;
        return regex.test(password);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...errors };
        setFormData({
            ...formData,
            [name]: value
        });
        if (name && value !== "") {
            newErrors[name] = false;
        }
        if (name === "email" && !validateEmail(value) || name === "email" && !validatePhoneNumber(value)) {
            newErrors[name] = true;
        }
        if (name === "email" && (validateEmail(value) || validatePhoneNumber(value))) {
            newErrors[name] = false;
        }
        if (name === "password" && !validatePassword(value)) {
            newErrors[name] = true;
        }
        if (name === "password" && validatePassword(value)) {
            newErrors[name] = false;
        }
        setErrors(newErrors);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleFocus = (e) => {
        const { name } = e.target;
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        if (!value) {
            newErrors[name] = true;
        } else {
            delete newErrors[name];
        }
        if (name && value !== "") {
            newErrors[name] = false;
        }
        if (name === "email" && !validateEmail(value) || name === "email" && !validatePhoneNumber(value)) {
            newErrors[name] = true;
        }
        if (name === "email" && (validateEmail(value) || validatePhoneNumber(value))) {
            newErrors[name] = false;
        }
        if (name === "password" && !validatePassword(value)) {
            newErrors[name] = true;
        }
        if (name === "password" && validatePassword(value)) {
            newErrors[name] = false;
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        for (let field in formData) {
            if (!formData[field]) {
                newErrors[field] = true;
            }
            if (field === "email" && (!validateEmail(formData[field]) || field === "email" && !validatePhoneNumber(formData[field]))) {
                newErrors[field] = true;
            }
            if (field === "password" && !validatePassword(formData[field])) {
                newErrors[field] = true;
            }
            if (formData[field] !== "" && !validatePassword(formData[field])) {
                if (newErrors[field] !== false) {
                    delete newErrors[field];
                }
            }
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const formattedBirthday = `${formData.year}-${formData.month.toString().padStart(2, '0')}-${formData.day.toString().padStart(2, '0')}`;
            try {
                const res = await axios.post(`http://localhost:8080/register`, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    birthday: formattedBirthday,
                    gender: formData.gender
                });
                if (res.data === "Registered successfully") {
                    enqueueSnackbar(res.data, { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
                    navigate("/login");
                } else if (res.data === "Email existed") {
                    enqueueSnackbar(res.data, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
                } else if (res.data === "Phone existed") {
                    enqueueSnackbar(res.data, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
                }
            } catch (error) {
                enqueueSnackbar("An error occurred during registration.", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
            }
        }
    };

    return (
        <div className='bg-slate-100 min-h-screen flex flex-col items-center text-center px-2'>
            <h1 className='text-blue-600 lg:text-5xl lg:py-8 custom-sm:text-3xl font-bold custom-sm:py-3'>facebook</h1>
            <div className='w-full sm:w-10/12 lg:w-6/12 xl:w-4/12 flex justify-center'>
                <form className='w-full bg-white shadow-lg rounded-lg p-3' onSubmit={handleSubmit}>
                    <h1 className='text-black text-xl sm:text-2xl font-bold'>Create a new Account</h1>
                    <p className='text-gray-500 text-sm'>It's quick and easy.</p>
                    <hr className="my-4" />
                    <div className="w-full grid grid-cols-1 custom-sm:grid-cols-2 gap-4">
                        <div className="relative w-full">
                            <input
                                type='text'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                placeholder='First Name'
                                className={`w-full h-12 sm:h-14 p-5 border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-100'} border-solid rounded-lg outline-none`}
                            />
                            {errors.firstName && (
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
                            )}
                            {errors.firstName && (
                                <div className="hidden lg:block absolute -translate-x-[150px] -translate-y-[45px] w-max p-2 bg-red-500 text-white text-xs rounded-lg opacity-100 transition-opacity">
                                    Please enter First Name
                                </div>
                            )}
                        </div>
                        <div className="relative w-full">
                            <input
                                type='text'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                placeholder='Last Name'
                                className={`w-full h-12 sm:h-14 p-5 border-2 ${errors.lastName ? 'border-red-500' : 'border-gray-100'} border-solid rounded-lg outline-none`}
                            />
                            {errors.lastName && (
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
                            )}
                            {errors.lastName && (
                                <div className="hidden lg:block absolute translate-x-[290px] -translate-y-[45px] w-max p-2 bg-red-500 text-white text-xs rounded-lg opacity-100 transition-opacity">
                                    Please enter Last Name
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative w-full mt-4">
                        <input
                            type='text'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            placeholder='Mobile number or email address'
                            className={`w-full h-12 sm:h-14 p-5 border-2 ${errors.email ? 'border-red-500' : 'border-gray-100'} border-solid rounded-lg outline-none`}
                        />
                        {errors.email && (
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
                        )}
                        {errors.email && (
                            <div className="hidden lg:block absolute -translate-x-[145px] -translate-y-[45px] w-max p-2 bg-red-500 text-white text-xs rounded-lg opacity-100 transition-opacity">
                                Email or phone invalid
                            </div>
                        )}
                    </div>
                    <div className="relative w-full mt-4">
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            placeholder='New password'
                            className={`w-full h-12 sm:h-14 p-5 border-2 ${errors.password ? 'border-red-500' : 'border-gray-100'} border-solid rounded-lg outline-none`}
                        />
                        {errors.password && (
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
                        )}
                        {errors.password && (
                            <div className="hidden lg:block absolute -translate-x-[180px] -translate-y-[45px] w-max p-2 bg-red-500 text-white text-xs rounded-lg opacity-100 transition-opacity">
                                Please enter a valid password
                            </div>
                        )}
                    </div>
                    <p className='text-gray-500 text-left pt-4'>Birthday</p>
                    {(errors.day || errors.month || errors.year) && (
                        <div className="hidden lg:block absolute -translate-x-[141px] -translate-y-[28px] w-max p-2 bg-red-500 text-white text-xs rounded-lg opacity-100 transition-opacity">
                            Please select Birthday
                                </div>
                    )}
                    <div className="w-full grid grid-cols-3 gap-4">
                        <div className="relative w-full">
                            <select
                                name='day'
                                value={formData.day}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                className={`w-full h-12 sm:h-14 px-4 border-2 ${errors.day ? 'border-red-500' : 'border-gray-100'} border-solid rounded-lg outline-none cursor-pointer`}
                            >
                                <option value=''>Day</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="relative w-full">
                            <select
                                name='month'
                                value={formData.month}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                className={`w-full h-12 sm:h-14 px-4 border-2 ${errors.month ? 'border-red-500' : 'border-gray-100'} border-solid rounded-lg outline-none cursor-pointer`}
                            >
                                <option value=''>Month</option>
                                {[
                                    'January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'
                                ].map((month, i) => (
                                    <option key={i + 1} value={i + 1}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="relative w-full">
                            <select
                                name='year'
                                value={formData.year}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                className={`w-full h-12 sm:h-14 px-4 border-2 ${errors.year ? 'border-red-500' : 'border-gray-100'} border-solid rounded-lg outline-none cursor-pointer`}
                            >
                                <option value=''>Year</option>
                                {[...Array(118)].map((_, i) => (
                                    <option key={currentYear - i} value={currentYear - i}>{currentYear - i}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <p className='text-gray-500 text-left pt-4'>Gender</p>
                    {errors.gender && (
                                <div className="hidden lg:block absolute -translate-x-[150px] -translate-y-[28px] w-max p-2 bg-red-500 text-white text-xs rounded-lg opacity-100 transition-opacity">
                                    Please select a gender
                                </div>
                            )}
                    <div className="w-full grid grid-cols-3 gap-4">
                        <div className="relative w-full">
                            <label className={`border-2 ${errors.gender ? 'border-red-500' : 'border-gray-100'} rounded-lg flex items-center justify-between h-12 sm:h-14 cursor-pointer `}>
                                <span className='ml-4 text-gray-500'>Male</span>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='male'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    className='mr-4'
                                />
                            </label>
                        </div>
                        <div className="relative w-full">
                        <label className={`border-2 ${errors.gender ? 'border-red-500' : 'border-gray-100'} rounded-lg flex items-center justify-between h-12 sm:h-14 cursor-pointer `}>
                                <span className='ml-4 text-gray-500'>Female</span>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='female'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    className='mr-4'
                                />
                            </label>
                        </div>
                        <div className="relative w-full">
                        <label className={`border-2 ${errors.gender ? 'border-red-500' : 'border-gray-100'} rounded-lg flex items-center justify-between h-12 sm:h-14 cursor-pointer `}>
                                <span className='ml-4 text-gray-500'>Other</span>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='other'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    className='mr-4'
                                />
                            </label>
                        </div>
                    </div>
                    <p className='text-gray-500 text-xs text-left py-3 leading-4'>People who use our service may have uploaded your contact information to Facebook. <Link to='/' className='text-blue-500'>Learn more.</Link></p>
                    <p className='text-gray-500 text-xs text-left py-3 leading-4'>By clicking Sign Up, you agree to our <Link to='/' className='text-blue-500'>Terms, Privacy Policy</Link> and <Link to='/' className='text-blue-500'>Cookies Policy.</Link> You may receive SMS notifications from us and can opt out at any time.</p>
                    <div className="w-full py-2 flex justify-center flex-col items-center">
                        <button type='submit' className='bg-green-500 rounded-lg w-9/12 text-white text-xl font-bold p-2 hover:bg-green-600 active:scale-95 transition-all'>Sign Up</button>
                        <Link to='/login' className='py-5 text-blue-500 hover:underline'>Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
