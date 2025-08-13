import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authServices from '../../appwrite/auth';
import { logIn } from '../../store/authSlice';


function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async (data) => {
        const { name, email, password } = data;

        try {
            const userData = await authServices.createAccount({ email, password, name });
            if (userData) {
                dispatch(logIn(userData));
                // After successful signup, redirect to home page
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="text-center text-4xl text-white">... Sign Up Here ...</h1>
            <div className='flex justify-center mt-5 '>
                <form onSubmit={handleSubmit(handleSignUp)} className='flex justify-center flex-col min-h-dvh'>
                    <input type="text" {...register("name", { required: true })} className='input border-white' placeholder='Enter Name : ' />
                    <br />
                    <input type="email" {...register("email", { required: "please check the email" })} className='input border-white' placeholder='Enter Email : ' /><br />
                    <input type="password" {...register("password", { required: "Please check the password" })} className='input border-white' placeholder='Enter Password : ' />
                    <br />
                    <input type="submit" className='btn btn-primary ' />
                </form>
            </div>
        </div>
    )
}

export default Signup
