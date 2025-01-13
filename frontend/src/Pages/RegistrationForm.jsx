import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../Service/AuthService';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^\+?([0-9]{1,3})?([0-9]{10})$/, 'Invalid phone number')
      .required('Phone number is required'),
    panCardNumber: Yup.string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, 'Invalid PAN Card number')
      .required('PAN Card Number is required'),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /^(?=.*[0-9])/,
        "Password must contain at least one number"
      )
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  // Have to call an API
  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("Registration Successful: " + response.message);
      navigate("/dashboard")

    } catch (error) {
      alert("Error: " + error.message);
    }

  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-2">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="lastName"
            type="text"
            {...register('lastName')}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-2">{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            {...register('phoneNumber')}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-2">{errors.phoneNumber.message}</p>}
        </div>

        {/* PAN Card Number */}
        <div className="mb-4">
          <label htmlFor="panCardNumber" className="block text-sm font-medium text-gray-700">PAN Card Number</label>
          <input
            id="panCardNumber"
            type="text"
            {...register('panCardNumber')}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
          />
          {errors.panCardNumber && <p className="text-red-500 text-xs mt-2">{errors.panCardNumber.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
        </div>


        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
