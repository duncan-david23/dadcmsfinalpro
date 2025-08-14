import React, { useEffect, useState } from 'react'
import Lottie from "lottie-react";
import mail_animation from '../animation/mail_animation.json';
import Newmail_anim from '../animation/Newmail_anim.json';
import { useAppContext } from '../contexts/AppContext';
import { messagesData } from '../assets/data';
import axios from 'axios'
import { supabase } from '../utils/Supabase';

const ViewMessage = ({ msId }) => {
  const [msData, setMsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMesgData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      setLoading(true);
      try {
        const result = await axios.get(`https://smart-btn-backend.onrender.com/api/users/get-messages`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setMsData(result.data.data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching messages data", error);
      }
    };
    fetchMesgData();
  }, []);

  const messageData = msData?.find(item => item.id === msId);



  const splitMessage = (message) => {
    const firstCommaIndex = message.indexOf(',');

    if (firstCommaIndex === -1) {
      return {
        preview: message,
        body: '',
      };
    }

    const preview = message.slice(0, firstCommaIndex + 1).trim();
    const body = message.slice(firstCommaIndex + 1).trim();

    return { preview, body };
  }

  const { preview, body } = messageData
    ? splitMessage(messageData.sender_message)
    : { preview: '', body: '' };


const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}


  return (
    <div className='lg-ml-[30px] px-[50px] pt-[30px] flex-1 lg:block md:block hidden  scrollbar-hide scrollbar-hide::-webkit-scrollbar  h-[100vh] overflow-y-auto overflow-x-hidden'>
      {!messageData ? 
        <Lottie animationData={Newmail_anim} loop={true} className='w-[120px] flex mx-auto mt-[300px]' />
        :
        <>
          <h1 className='font-bold text-xl'>{messageData.subject}</h1>
          <div className='flex items-center'>
            <Lottie animationData={mail_animation} loop={true} className='w-[80px]' />
            <div>
              <h1 className='font-semibold text-sm'>{messageData.sender_name}</h1>
              <p className='text-gray-500 text-xs'>{messageData.sender_email}</p>
            </div>
          </div>
          <div className='mt-[25px] px-[25px] tracking-wide'>
            <p className='text-gray-900 font-medium text-lg mb-2'>{preview}</p>
            <p className='text-gray-700 font-thin'>{body}</p>
          </div>

          <div className='mt-[40px]'>
                <p className='text-purple-700 font-thin text-xs  ml-[25px]'>{formatDate(messageData.created_at)}</p>
          </div>
        </>
      }
    </div>
  );
};

export default ViewMessage;