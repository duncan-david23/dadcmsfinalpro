import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/Supabase';
import Sidebar from '../components/Sidebar';
import { messagesData } from '../assets/data';
import ViewMessage from '../components/ViewMessage';
import axios from 'axios'
import Lottie from "lottie-react";
import loading_anim from '../animation/loading_anim.json'
import mail_animation from '../animation/mail_animation.json';



const Messages = () => {
    const [messageId, setMessageId] = useState()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeMessageId, setActiveMessageId] = useState()
    const [msgReadStatus, setMsgReadStatus] = useState()




    const handleMessageSelector = async (id)=> {
        setMessageId(id);
        setActiveMessageId(id);

        const { data: { session } } = await supabase.auth.getSession()
        const accessToken = session?.access_token

         try {
        const result = await axios.put(`https://smart-btn-backend.onrender.com/api/users/read-status-update`, {messageId: id}, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`, // add token to request
                    },
                });
            const response = result.data
            setMessages(prevMessages =>
                        prevMessages.map(msg =>
                            msg.id === id ? { ...msg, read: true } : msg
                        )
                );
                            

      } catch (error) {
        console.error("an error occurred while updating message status", error);
      }

    }


    useEffect(() => {
    const fetchMessageData  = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const accessToken = session?.access_token
      setLoading(true)
      try {
        const result = await axios.get(`https://smart-btn-backend.onrender.com/api/users/get-messages`, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`, // add token to request
                    },
                });
            const response = result.data
            setMessages(response.data)
       
        setLoading(false)

      } catch (error) {
        console.error("an error occurred while fetching messages data", error);
      }
    }
    fetchMessageData ();
  }, [])

//   converting date to days ago
const getTimeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now - past;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30); // rough estimate

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
}

  return (
    <div className='flex' >
        <Sidebar/>
        <div className='lg:px-[30px] lg:w-[350px] md:px-[20px] md:w-[250px] scrollbar-hide scrollbar-hide::-webkit-scrollbar pt-[30px] border border-gray-100 h-[100vh] overflow-y-auto overflow-x-hidden'>
         {loading ? <Lottie animationData={loading_anim} loop={true} className='w-[200px] mt-[200px]'/>
                        : ''}
        
        {!loading && messages.length <1 ? 
          <div>
            <Lottie animationData={mail_animation} loop={true} className='w-[120px] mx-auto mt-[300px]' /> 
            <p className='text-xs text-gray-300 mt-[-15px] text-center'>You have no messages</p>
          </div>
        
        : ''}
            
            {messages?.map((item)=> {

                const truncate = (str, n) => {
                return str && str.length > n ? str.slice(0, n) + "..." : str;
                }
         

            return (
                

                
                    
                    <div key={item.id} onClick={()=> handleMessageSelector(item.id)} className={`px-[20px] md:ml-[0px] lg:ml-[0px]  ml-[10px] py-[20px] lg:w-[300px] md:w-[300px] w-[270px] h-[120px] border-l-3 border-purple-500  rounded-xl my-[10px] bg-gray-50 ${activeMessageId===item.id ? 'bg-purple-500': ''} cursor-pointer transition-all hover:scale-105`}>
                        
                        <>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex items-center gap-[10px]'>
                                {item.read===false && 
                                    <p className='w-[10px] h-[10px] bg-blue-600 rounded-full'></p>
                                }
                                <p className={`text-gray-700 font-semibold text-sm ${activeMessageId===item.id ? 'text-white': ''}`}>{truncate(item.subject, 20)}</p>
                            </div>
                            <p className='text-gray-400 text-xs font-thin'>{getTimeAgo(item.created_at)}</p>
                        </div>
                        <p className={`mt-[15px] text-gray-500 font-thin text-xs ${activeMessageId===item.id ? 'text-white': ''}`}>{truncate(item.sender_message, 120)}</p>
                        </>
                           
                    </div>
            


                
            )

})}



        </div>

       <ViewMessage msId={messageId} />
    </div>
  )
}

export default Messages;