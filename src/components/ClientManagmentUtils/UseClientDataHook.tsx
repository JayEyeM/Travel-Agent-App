// UseClientDataHook.tsx

import React, { useState, useEffect } from 'react'; 


//Custom hook to use ClientList data from local storage

const useClientData = () => {
    const [clientData, setClientData] = useState([]);
    useEffect(() => {
        const storedData = localStorage.getItem('ClientList');
        if (storedData) {
            setClientData(JSON.parse(storedData));
        }
    }, []);
    return clientData;
};
export default useClientData