// src/api/ClientAPIs.ts
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

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
  dateCreated: number;
}

// GET all clients
export async function getClients(): Promise<Client[]> {
  const res = await fetch(`${BASE_URL}/clients`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
}

// GET client by ID
export async function getClientById(id: number): Promise<Client> {
  const res = await fetch(`${BASE_URL}/clients/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to fetch client ${id}`);
  return res.json();
}

// POST create client
export async function createClient(client: Omit<Client, "id" | "userId" | "dateCreated">): Promise<Client> {
  const res = await fetch(`${BASE_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(client),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "Failed to create client");
  }
  return res.json();
}

// PATCH update client
export async function updateClient(id: number, updates: Partial<Client>): Promise<Client> {
  const res = await fetch(`${BASE_URL}/clients/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || `Failed to update client ${id}`);
  }
  return res.json();
}

// DELETE client
export async function deleteClient(id: number): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/clients/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || `Failed to delete client ${id}`);
  }
  return res.json();
}
