import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import authServices from '../../appwrite/auth';
import { logIn } from '../../store/authSlice';



function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    //This is for auth services


    //Here is the work for Redux 
    const userInfo = useSelector((state) => state.auth.userData);
    console.log(userInfo)

    const handleSignUp = async (data) => {
        const { name, email, password } = data;

        try {
            const userData = await authServices.createAccount({ email, password, name });
            if (userData) {
                dispatch(logIn(userData))
            }
        } catch (error) {
            console.log(error)
        }

        console.log(data);
        console.log(userInfo)
    }


    return (
        <div>
            <h1 className="text-center text-4xl text-white">... Sign Up Here ...</h1>
            <div className='flex justify-center mt-5 '>
                <form onSubmit={handleSubmit(handleSignUp)} className='flex justify-center flex-col min-h-dvh'>
                    <input type="text" {...register("name", { required: true })} className='input border-white' placeholder='Enter Name : ' />
                    <br />
                    <input type="email" {...register("email", { required: "plase check the email please" })} className='input border-white' placeholder='Enter Email : ' /><br />
                    <input type="password" {...register("password", { required: "Please check the password" })} className='input border-white' placeholder='Enter Password : ' />
                    <br />
                    <input type="submit" className='btn btn-primary ' />
                </form>
            </div>
        </div>
    )
}

export default Signup
