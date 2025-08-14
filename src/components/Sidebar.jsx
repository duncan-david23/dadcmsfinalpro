import React, { useContext, useState, useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { supabase } from '../utils/Supabase'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Sidebar = () => {
const {activeMenu, setActiveMenu} = useAppContext()
const [msDataLength, setMsDataLength] = useState()
const navigate = useNavigate();

const handleMessages = ()=> {
    setActiveMenu('messages')
    navigate('/messages')
}

const handleSettings = ()=> {
    setActiveMenu('settings')
    navigate('/settings')
}

const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            window.location.href = '/login'; 
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
        }
    };


     useEffect(() => {
        const fetchMesgData = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          const accessToken = session?.access_token;
          try {
            const result = await axios.get(`https://smart-btn-backend.onrender.com/api/users/get-messages`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          
            setMsDataLength(result.data.data.length);
          } catch (error) {
            console.error("An error occurred while fetching messages data", error);
          }
        };
        fetchMesgData();
      }, []);
    



  return (
    <div className='lg:px-[20px] w-[80px] lg:w-[250px] md:px-[10px] md:w-[200px] h-[100vh] bg-gray-50 py-[30px]'>
        <div onClick={handleSignOut} className='flex ml-[10px] lg:ml-[1px] md:ml-[1px]   items-center gap-[10px] w-fit px-[10px] py-[10px] rounded-md bg-purple-600 text-white cursor-pointer hover:bg-purple-700 transition-all hover:scale-105 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            {/* <p className=' text-sm text-white'>Sign Out</p> */}
        </div>

        <div className='mt-[50px] '>
            <h1 className='mb-[10px] ml-[20px] text-gray-500 hidden lg:block md:block   '>Mail</h1>
            {/* message link */}
            <div onClick={handleMessages}  className={`flex items-center ${activeMenu==='messages' ? 'bg-white ': ''} rounded-lg px-[30px] py-[10px] cursor-pointer transition-all hover:scale-110 justify-between lg:gap-[10px]`}>
                <div className='flex items-center gap-[10px]'>       
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 text-gray-500 ${activeMenu==='messages' ? 'text-gray-800' :''} `}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                    </svg>
                    <p className={`text-gray-500 lg:block md:block hidden font-thin ${activeMenu==='messages'? 'text-gray-800' :''} hover:text-gray-800 ` }>Messages</p>
                </div>

                <div>
                    <p className='text-gray-400 lg:block md:block text-sm m hidden'>{msDataLength  || 0}</p>
                </div>
            </div>


        </div>


         <div className='my-[20px] '>
            <h1 className='mb-[10px] ml-[20px] text-gray-500 hidden lg:block md:block    '>Settings</h1>
            {/* settings link */}
            <div onClick={handleSettings}   className={`flex items-center ${activeMenu==='settings'? 'bg-white ': ''} rounded-lg px-[30px] py-[10px] cursor-pointer transition-all hover:scale-110  justify-between`}>
                <div className='flex items-center gap-[10px]'>       
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 text-gray-500 ${activeMenu==='settings' ? 'text-gray-800' :''} `}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>

                    <p className={`text-gray-500 font-thin lg:block md:block hidden ${activeMenu==='settings' ? 'text-gray-800' :''} hover:text-gray-800 ` }>Settings</p>
                </div>

            </div>


        </div>
    </div>
  )
}

export default Sidebar