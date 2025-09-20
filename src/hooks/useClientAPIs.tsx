// src/hooks/useClientAPIs.tsx
import { useState, useCallback } from "react";
import * as ClientAPI from "../api/ClientAPIs";

export function useClientAPIs() {
  const [clients, setClients] = useState<ClientAPI.Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all clients
  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ClientAPI.getClients();
      setClients(data);
      return data;
    } catch (err: any) {
      setError(err.message || "Error fetching clients");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Get a single client by ID (does not update state)
  const fetchClientById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const client = await ClientAPI.getClientById(id);
      return client;
    } catch (err: any) {
      setError(err.message || `Error fetching client ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new client → auto-add to clients state
  const createClient = useCallback(
    async (client: Omit<ClientAPI.Client, "id" | "userId" | "dateCreated">) => {
      setLoading(true);
      setError(null);
      try {
        const newClient = await ClientAPI.createClient(client);
        setClients((prev) => [...prev, newClient]);
        return newClient;
      } catch (err: any) {
        setError(err.message || "Error creating client");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Update client → auto-update clients state
  const updateClient = useCallback(
    async (id: number, updates: Partial<ClientAPI.Client>) => {
      setLoading(true);
      setError(null);
      try {
        const updated = await ClientAPI.updateClient(id, updates);
        setClients((prev) => prev.map((c) => (c.id === id ? updated : c)));
        return updated;
      } catch (err: any) {
        setError(err.message || `Error updating client ${id}`);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete client → auto-remove from clients state
  const deleteClient = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await ClientAPI.deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || `Error deleting client ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    clients,
    loading,
    error,
    fetchClients,
    fetchClientById,
    createClient,
    updateClient,
    deleteClient,
  };
}
