import React, { useState } from 'react'
import Lottie from "lottie-react";
import Circle_animation from '../animation/Circle_animation.json'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/Supabase';



const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async(e)=> {
        e.preventDefault();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (error) {
            setMsg(error.message);
            console.log(error.message)
            return
        }
        
        // localStorage.setItem('userId', data.user.id);
        // localStorage.setItem('userEmail', data.user.email);
  
      // setUserAuth(data.user);
      navigate('/messages');
    //   notify();
  } catch (error) {
    console.error('Error signing in:', error);
    setMsg( 'An error occurred during sign in, please check your details and try again.');
  }
    }

  return (
    <div className='h-[100vh] w-full flex justify-center items-center bg-gray-50 '>
        <div className='w-[300px] h-[450px] md:w-[350px] md:h-[450px] shadow-xl rounded-xl bg-white px-[20px] py-[20px]'>
            <div>
                <Lottie animationData={Circle_animation} loop={true} className='w-[70px] mx-auto mt-[10px] mb-[20px]'/>
            </div>

            {/* <h1 className='text-xl text-gray-800 my-[15px] font-extrabold'>Login</h1> */}
            <p className='text-sm text-gray-600 my-[8px]'>Welcome back</p>
            <div>
              <form onSubmit={handleLogin} >
                <p className='text-sm text-center'>{msg&&msg}</p>
                <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)} className='w-full h-[30px] border border-gray-200 px-[20px] py-[20px] rounded-lg my-[8px]' />
                <input type="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}  className='w-full h-[30px] border border-gray-200 px-[20px] py-[20px] rounded-lg my-[8px]' />
                <div>
                    {/* <p className='text-xs text-gray-400'>Forgot Password?</p> */}
                </div>
                <div>
                    <button type='submit' className='bg-purple-700 text-white py-[10px] px-[20px] w-full mt-[20px] rounded-lg hover:bg-purple-800 transition-all'>Continue</button>
                </div>

                <div className='flex items-center gap-[4px] justify-center mt-[20px]'>
                    <h1 className='text-gray-600 text-sm'>New User?</h1>
                    <p onClick={()=> navigate('/register')} className='font-bold text-sm cursor-pointer'>Register</p>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login