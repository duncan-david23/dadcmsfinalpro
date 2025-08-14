import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/Supabase'
import Lottie from "lottie-react";
import loading_anim from '../animation/loading_anim.json'

const ApiKeysComponent = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsloading] = useState(false)


 useEffect(() => {
    const fetchUser = async () => {
        setIsloading(true)
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        console.error('Error fetching user:', error)
      } else {
        setUser(user)
      }
      setIsloading(false)
    }

    fetchUser()
  }, [])


  return (
    <div className='px-[30px] pt-[30px] w-[1000px] flex h-[100vh] items-center justify-center'>
        {isLoading ? 
        <Lottie animationData={loading_anim} loop={true} className='w-[200px]'/>
        
        :
        
        <div className=''>
            <h1 className='text-gray-500'>🔐 This public key is safe to use in frontend code. It cannot be used to access or modify your account.</h1>
            <div className='flex items-center gap-[30px] ml-[20px]'>
                <p className='text-sm text-gray-600'>Public key:</p>
                <p className='py-[5px] text-gray-500 px-[20px] border border-gray-100 rounded-lg my-[20px] font-thin tracking-wider'>
                    {user?.id}
                </p>
            </div>
        </div>
        }
    </div>
  )
}

export default ApiKeysComponent