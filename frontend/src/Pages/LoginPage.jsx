import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/AuthService';

const LoginPage = () => {
    const Navigate = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Please enter a valid email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
    });


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    //API
    const onSubmit = async (data) => {
        try {
            const res = await loginUser(data); // Send login request
            alert("Logged in Successfully: " + res.message); // Success message

            // Optionally, you can store the token in localStorage or cookies
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            Navigate('/dashboard')

            // Redirect to a protected page or update UI
            // For example:
            // navigate("/dashboard");

        } catch (error) {
            // Handle error
            if (error.message === "Network Error") {
                alert("Network error. Please check your connection.");
            } else {
                alert(error.message); // Show server error message
            }
        }

        console.log('Form submitted', data); // Log the form data
    };




    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot Password Link */}
                <div className="mt-4 text-center flex justify-around">
                    <NavLink to="forgot" className="text-blue-500 text-sm hover:underline">Forgot Password?</NavLink>
                    <NavLink to="registration" className="text-blue-500 text-sm hover:underline">New User?</NavLink>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
