import { useState, useEffect } from 'react'; 
import { newClientFormData } from '../generalUtils/interfaces';

// UseClientDataHook.ts
const useClientData = () => {
    const [clientData, setClientData] = useState<newClientFormData[]>([]);

    // Fetch client data from backend
    const fetchClientsFromBackend = async () => {
        try {
            const response = await fetch('http://localhost:8000/clients');
            if (!response.ok) throw new Error('Failed to fetch clients from backend');
            
            const data = await response.json();
            setClientData(data); // Update state with backend data
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    // Load client data on initial render
    useEffect(() => {
        fetchClientsFromBackend(); // Fetch from backend on initial load
    }, []);

    
    const updateClientData = (updatedClients: newClientFormData[]) => {
        setClientData(updatedClients);
    };

    return { clientData, updateClientData };
};

export default useClientData;
