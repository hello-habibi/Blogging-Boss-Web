
import React from 'react'
import { useForm } from 'react-hook-form';
import authServices from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/authSlice';

function Login() {
    
    const  {register , handleSubmit , watch , formState:{errors}} = useForm();

    const dispatch = useDispatch();

    const handleLogIn = async(data)=>{
        const {email , password} = data;
        try {
            const userinfo = await authServices.logIn({email, password});
            console.log(userinfo)
            dispatch(logIn(userinfo));
            
        } catch (error) {
            console.log(error)
            
        }
        console.log(data)


    }
    return (
        <div>
    <h1 className="text-center text-4xl text-white bottom-3 border-b-2 pb-2">Log In </h1>
    <div className='flex justify-center top-10 mt-5 '>
        <form onSubmit={handleSubmit(handleLogIn)} className='flex justify-center flex-col min-h-dvh'>
            <input type="email" {...register("email" , {required:true})} className='input border-white' placeholder='Enter Email : '  /><br />
            <input type="password" {...register("password" , {required:true})} className='input border-white' placeholder='Enter Password : '  />
            <br />{errors.email && <span>roblem in the email </span>}
            <br />{errors.password && <span>problem in the password </span>}
            <input type="submit" className='btn btn-primary '  />
        </form>
    </div>
</div>
    )
}

export default Login
