import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const LoginPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
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
            try {
                axios.post(`http://localhost:8080/login`, formData).then(res =>{
                    if(res.data.code === "200"){
                        localStorage.setItem("currentUser", JSON.stringify(res.data.data))
                        enqueueSnackbar(res.data.msg, { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
                        navigate("/homePage")
                    }else if(res.data.code === "401"){
                        enqueueSnackbar(res.data.msg, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
                    }
                })
            } catch (error) {
                enqueueSnackbar("An error occurred during registration.", { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
            }
        }
    };

    return (
        <div className='bg-slate-100 min-h-screen flex flex-col'>
            <div className='flex flex-col items-center text-center lg:flex-row md:justify-evenly flex-grow login-page'>
                <div className='text-box'>
                    <h1 className='text-blue-600 text-6xl font-bold py-5'>facebook</h1>
                    <h4 className='text-2xl'>
                        Connect with friends and the world
                        <br /> around you on Facebook.
                    </h4>
                </div>

                <div className='w-10/12 h-auto sm:w-7-12 lg:w-3/12 xl:w-3/12 login-form'>
                    <form className='w-full h-min bg-white shadow-lg rounded-lg mt-6' onSubmit={handleSubmit}>
                        <input
                            type='email'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            placeholder='Email or Phone Number'
                            className={`w-11/12 h-14 p-5 border-2 border-solid m-3 ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-lg outline-none`}
                            autoComplete="email"
                        />
                        {errors.email && (
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 absolute -translate-x-[50px] translate-y-[30px] transform" />
                        )}
                        {errors.email && (
                            <div className="hidden lg:block absolute -translate-x-[125px] -translate-y-[57px] w-max p-2 bg-red-500 text-white text-xs rounded-lg opacity-100 transition-opacity">
                                Email or phone invalid
                            </div>
                        )}
                        <input
                            type='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            name="password"
                            className={`w-11/12 h-14 p-5 border-2 border-solid ${errors.password ? 'border-red-500' : 'border-gray-100'} rounded-lg outline-none`}
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 absolute -translate-x-[38px] translate-y-[20px] transform" />
                        )}
                        {errors.password && (
                            <div className="hidden lg:block absolute -translate-x-[97px] -translate-y-[48px] w-max p-2 bg-red-500 text-white text-xs rounded-lg opacity-100 transition-opacity">
                                Password invalid
                            </div>
                        )}
                        <button type="submit" className='w-11/12 h-14 bg-blue-600 mt-4 rounded-lg text-white text-2xl font-semibold'>
                            Log in
                        </button>
                        <p className='text-blue-500 mt-3 cursor-pointer hover:underline'>Forgot Password ?</p>
                        <hr className='mt-4 w-4/5 mx-auto' />
                        <Link to={"/register"}>
                            <button className='w-2/4 h-11 bg-custom-green text-white my-6 rounded-lg'>
                                Create New Account
                            </button>
                        </Link>
                    </form>
                    <p className='my-2 p-2 md:w-full'>
                        <span className='font-semibold cursor-pointer hover:underline'>Create a Page</span> for a celebrity, brand or business
                    </p>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default LoginPage