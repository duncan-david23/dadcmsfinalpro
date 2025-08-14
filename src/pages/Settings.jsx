import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/Supabase';
import Sidebar from '../components/Sidebar';
import { messagesData } from '../assets/data';
import ViewMessage from '../components/ViewMessage';
import { useAppContext } from '../contexts/AppContext';
import ApiKeysComponent from '../components/ApiKeysComponent';
import ProfileSettings from '../components/ProfileSettings';
import ApiDocs from '../components/ApiDocs';
const Settings = () => {
  const { setActiveMenu, activeSettingsMenu, setActiveSettingsMenu} = useAppContext();

   


    const handleProfileSettings = ()=> {
        setActiveSettingsMenu('profile-settings')
    }

    const handleApiSettings = ()=> {
        setActiveSettingsMenu('api-settings')
    }
    const handleApiDocs = ()=> {
        setActiveSettingsMenu('api-docs')
    }

    
    useEffect(()=> {
        setActiveMenu('settings')
    }, [])

  return (
    <div className='flex' >
        <Sidebar/>
        <div className='px-[10px] scrollbar-hide scrollbar-hide::-webkit-scrollbar pt-[30px] border border-gray-100 h-[100vh] overflow-y-auto overflow-x-hidden'>

            
            {/* <div onClick={handleProfileSettings} className={`flex items-center gap-[10px] rounded hover:bg-gray-100 transition-all py-[10px] px-[50px] cursor-pointer my-[10px] ${activeSettingsMenu ==='profile-settings' ? 'bg-gray-200': ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

                <h1 className='text-gray-500 text-sm'>Profile Settings</h1>
            </div> */}
            
            
            <div onClick={handleApiSettings} className={`flex items-center gap-[10px] rounded hover:bg-gray-100 transition-all py-[7px] px-[50px] cursor-pointer ${activeSettingsMenu ==='api-settings' ? 'bg-gray-200': ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
                <h1 className='text-gray-500 text-sm'>API Keys</h1>
            </div>

            <div onClick={handleApiDocs} className={`flex items-center gap-[10px] rounded hover:bg-gray-100 transition-all py-[7px] px-[50px] cursor-pointer ${activeSettingsMenu ==='api-docs' ? 'bg-gray-200': ''} mt-[10px]`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>

                <h1 className='text-gray-500 text-sm'>API Docs</h1>
            </div>

            
    
         </div>

         
         { activeSettingsMenu==='api-settings' && <ApiKeysComponent/>}
         { activeSettingsMenu==='api-docs' && <ApiDocs/>}
         {/* { activeSettingsMenu==='profile-settings' && <ProfileSettings/>} */}
         
    </div>
  )
}

export default Settings;