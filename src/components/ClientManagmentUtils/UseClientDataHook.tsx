// File: UseClientDataHook.tsx
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getData, postData, updateData } from "../generalUtils/APIs";

// Backend Client type
export interface Client {
  id: number;
  userId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientPostalCode: string;
  clientStreetAddress: string;
  clientCity: string;
  clientProvince: string;
  clientCountry: string;
  notes?: string;
  paymentDate?: number;
  finalPaymentDate?: number;
  dateCreated: number; // Unix timestamp
}

// Frontend-friendly Client for display
export interface ClientDisplay extends Omit<Client, "dateCreated"> {
  dateCreated: string; // formatted 'YYYY-MM-DD'
}

const useClientData = () => {
  const [clientData, setClientData] = useState<ClientDisplay[]>([]);

  // Fetch client data from backend
  const fetchClientsFromBackend = async () => {
    try {
      const data = await getData<Client[]>("clients"); // raw backend data
      console.log("Data from backend:", data);

      const formattedData: ClientDisplay[] = data.map((client) => ({
        ...client,
        dateCreated: dayjs.unix(client.dateCreated).format("YYYY-MM-DD"),
      }));

      setClientData(formattedData);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClientsFromBackend();
  }, []);

  // Replace full client data (used after add/update)
  const updateClientData = (updatedClients: ClientDisplay[]) => {
    setClientData(updatedClients);
  };

  // Add new client
  const addClient = async (client: Omit<Client, "id">) => {
    try {
      const newClient = await postData<Client>("clients", client);
      const formattedClient: ClientDisplay = {
        ...newClient,
        dateCreated: dayjs.unix(newClient.dateCreated).format("YYYY-MM-DD"),
      };
      setClientData((prev) => [...prev, formattedClient]);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  // Update existing client
  const updateClient = async (
    clientId: number,
    updatedClient: Partial<Client>
  ) => {
    try {
      const updated = await updateData<Client>(
        `clients/${clientId}`,
        updatedClient
      );
      const formatted: ClientDisplay = {
        ...updated,
        dateCreated: dayjs.unix(updated.dateCreated).format("YYYY-MM-DD"),
      };
      setClientData((prev) =>
        prev.map((c) => (c.id === clientId ? formatted : c))
      );
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  return { clientData, updateClientData, addClient, updateClient };
};

export default useClientData;
