import { useState, useEffect } from 'react';
import { newClientFormData } from '../generalUtils/interfaces'; // Assuming the correct interface path
import { getData, postData, updateData } from '../generalUtils/APIs'; // Importing from the updated APIs.ts

// UseClientDataHook.ts
const useClientData = () => {
  const [clientData, setClientData] = useState<newClientFormData[]>([]);

  // Fetch client data from backend using the API helper
  const fetchClientsFromBackend = async () => {
    try {
      const data = await getData<newClientFormData[]>('clients'); // Using the generic getData function
      console.log('Data from backend:', data); // Log the data to see what it looks like
      setClientData(data); // Update state with backend data
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // Load client data on initial render
  useEffect(() => {
    fetchClientsFromBackend(); // Fetch from backend on initial load
  }, []);

  // Update client data (e.g., after adding or updating a client)
  const updateClientData = (updatedClients: newClientFormData[]) => {
    setClientData(updatedClients);
  };

  // Function to add a new client
  const addClient = async (clientData: newClientFormData) => {
    try {
      const addedClient = await postData<newClientFormData>('clients', clientData); // Using the generic postData function
      setClientData((prevClients) => [...prevClients, addedClient]); // Update the clientData state with the new client
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  // Function to update an existing client
  const updateClient = async (clientId: string, updatedClientData: newClientFormData) => {
    try {
      const updatedClient = await updateData<newClientFormData>(`clients/${clientId}`, updatedClientData); // Using the generic updateData function
      setClientData((prevClients) =>
        prevClients.map((client) =>
          client.id === Number(clientId) ? updatedClient : client 
        )
      ); // Update the clientData state with the updated client
    } catch (error) {
      console.error('Error updating client:', error);
    }
  };

  return { clientData, updateClientData, addClient, updateClient };
};

export default useClientData;
