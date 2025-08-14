import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Export a straight function to use the context


export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState('messages')
  const [activeSettingsMenu, setActiveSettingsMenu] = useState('api-settings')
  const [messageId, setMessageId] = useState()
   const [displayDonateModal, setDisplayDonateModal] = useState(false);
   const [donationAmount, setDonationAmount] = useState(0);
   const [messageQ, setMessageQ] = useState()
 


  const dataValues = {
    loading,
    setLoading,
    activeMenu, 
    setActiveMenu,
    messageId, 
    setMessageId,
    activeSettingsMenu, 
    setActiveSettingsMenu,
    donationAmount, setDonationAmount,
    displayDonateModal, setDisplayDonateModal,
    messageQ, setMessageQ
  };

  return (
    <AppContext.Provider value={ dataValues }>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);