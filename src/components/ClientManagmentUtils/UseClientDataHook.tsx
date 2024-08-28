import { useState, useEffect } from 'react'; 
import { newClientFormData } from '../generalUtils/interfaces';

// UseClientDataHook.ts
const useClientData = () => {
    const [clientData, setClientData] = useState<newClientFormData[]>([]);

    // Function to update client data
    const updateClientData = (updatedClients?: newClientFormData[]) => {
        if (updatedClients) {
            setClientData(updatedClients);
        } else {
            const storedData = localStorage.getItem('ClientList');
            if (storedData) {
                setClientData(JSON.parse(storedData));
            }
        }
    };

    // Load client data on initial render
    useEffect(() => {
        updateClientData();
    }, [clientData]);

    return { clientData, updateClientData };
};

export default useClientData;

