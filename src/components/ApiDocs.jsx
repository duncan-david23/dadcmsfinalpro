import React from 'react'
import code_snippet from '../assets/code_snippet.png'
import prop_tableImg from '../assets/prop_table.png'

const ApiDocs = () => {
  return (
    <div className='px-[30px] pt-[30px] w-[1000px] h-[100vh] overflow-y-auto pb-[50px]'>
       <h1 className='font-bold text-gray-500 text-xl text-center'>📦 Smart Submit Button Documentation</h1> 
       <p className='mt-[20px]'>A lightweight, plug-and-play React component for submitting form data securely via the <span className='font-bold'>DadCMS</span> platform</p>

       <div className='mt-[50px]'>
            <h1 className='text-2xl'>🚀 Installation</h1>
            <p className='bg-black text-white py-[10px] px-[20px] mt-[10px] rounded-lg w-fit'>npm install @daduncan/smart-submit-button</p>
       </div>

       <div className='mt-[50px]'>
            <h1 className='text-2xl mb-[15px]'>🔐 Authentication</h1>
            <p>To use the Smart Submit Button, you must first authenticate with the <span className='font-bold'>DadCMS</span> platform:</p>
            <div className='flex flex-col gap-[10px] mt-[10px]'>
                 <p>1. Sign up / Log in at DadCMS</p>
                 <p>2. Navigate to your Api Setings to generate a public key.</p>
                 <p>3. Use this public key in your component via the publicKey prop.</p>
            </div>
           
       </div>

       <div className='mt-[50px]'>
            <h1 className='text-2xl'>🧠 Usage Example</h1>
            <p className='mt-[20px]'>Here’s a complete example of how to integrate the button into your React app:</p>
            <img src={code_snippet } alt="" className='w-[700px] mt-[10px]' />
       </div>

       <div className='mt-[50px]'>
            <h1 className='text-2xl'>🧩 Props</h1>
            <p className='mt-[20px]'>You can customise the button with any style as styling any button as usual</p>
            <img src={prop_tableImg } alt="" className='w-[700px] mt-[10px]' />
       </div>

         <div className='mt-[50px]'>
            <h1 className='text-2xl'>⚠️ Notes</h1>
            <p className='mt-[20px]'>Here’s a complete example of how to integrate the button into your React app:</p>
            <div className='flex flex-col gap-[10px] mt-[10px]'>
                 <p>1. Ensure your publicKey is valid and active on DadCMS.</p>
                 <p>2. The data object should include all necessary fields expected by your backend</p>
                 <p>3. The component handles submission internally—no need for additional form handlers.</p>
            </div>
       </div>

         <div className='mt-[50px]'>
            <h1 className='text-2xl'>💡 Tips</h1>
            <div className='flex flex-col gap-[10px] mt-[10px]'>
                 <p>1. You can style the button using external CSS or inline styles.</p>
                 <p>2. For better UX, consider disabling the button while submission is in progress.</p>
            </div>
       </div>

    </div>
  )
}

export default ApiDocs