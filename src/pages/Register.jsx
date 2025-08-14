import React, { useState } from 'react'
import Lottie from "lottie-react";
import Circle_animation from '../animation/Circle_animation.json'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/Supabase';



const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSignUp = async(e)=> {
        e.preventDefault();
       
            try {
            const { data, error} = await supabase.auth.signUp({
                email: email,
                password: password
            });
        
            if (error) {
                    console.log(error);
                    setMsg(error.message);
                    return
                }

                // console.log(data.user);
                setMsg('User has been successfully registered');
        
        
            navigate('/messages');
            } catch (error) {
            console.error('Error signing in:', error);
            setMsg( 'An error occurred during sign up, please check your details and try again.');
            }
    }

  return (
    <div className='h-[100vh] w-full flex justify-center items-center bg-gray-50 '>
        <div className='w-[300px] h-[450px] md:w-[350px] md:h-[450px] shadow-xl rounded-xl bg-white px-[20px] py-[20px]'>
            <div>
                <Lottie animationData={Circle_animation} loop={true} className='w-[70px] mx-auto mt-[10px] mb-[20px]'/>
            </div>

            {/* <h1 className='text-xl text-gray-800 my-[15px] font-extrabold'>Login</h1> */}
            <p className='text-sm text-gray-600 my-[8px]'>Let's Get You Started</p>
            <div>
                <form onSubmit={handleSignUp}>
                <p className='text-sm text-center'>{msg&&msg}</p>
                <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)} className='w-full h-[30px] border border-gray-200 px-[20px] py-[20px] rounded-lg my-[8px]' />
                <input type="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}  className='w-full h-[30px] border border-gray-200 px-[20px] py-[20px] rounded-lg my-[8px]' />
                <div>
                    <button type='submit' className='bg-purple-700 text-white py-[10px] px-[20px] w-full mt-[20px] rounded-lg hover:bg-purple-800 transition-all'>Continue</button>
                </div>

                <div className='flex items-center gap-[4px] justify-center mt-[20px]'>
                    <h1 className='text-gray-600 text-sm'>Already have an account?</h1>
                    <p onClick={()=> navigate('/login')} className='font-bold text-sm cursor-pointer'>Sign in</p>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register