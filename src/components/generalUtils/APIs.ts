// File path: TravelAgentApp/src/components/generalUtils/APIs.ts

export const BASE_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000';

// Utility function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
  return await response.json();
};

// Generic CRUD API functions
export const API = {
  // GET: Fetch data from the server
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // <-- include cookies
      });
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  // POST: Create new data on the server
  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include', // <-- include cookies
      });
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },

  // PATCH: Update existing data on the server
  patch: async <T>(endpoint: string, data: unknown): Promise<T> => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include', // <-- include cookies
      });
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`PATCH ${endpoint} failed:`, error);
      throw error;
    }
  },

  // DELETE: Remove data from the server
  delete: async (endpoint: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // <-- include cookies
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  },
};

// Wrapper functions
export const postData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  return API.post<T>(endpoint, data);
};

export const getData = async <T>(endpoint: string): Promise<T> => {
  return API.get<T>(endpoint);
};

export const updateData = async <T>(endpoint: string, data: unknown): Promise<T> => {
  return API.patch<T>(endpoint, data);
};

export const deleteData = async (endpoint: string): Promise<void> => {
  return API.delete(endpoint);
};
