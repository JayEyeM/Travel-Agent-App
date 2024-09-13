import { useState, useEffect } from 'react';

// Interface for the commission data
interface CommissionData {
  commissionId: number;
  clientName: string;
  supplier: string;
  bookingTravelDate: string;
  confirmationNumber: string;
  finalPaymentDate: string;
  rate: number;
  commission: number;
  commissionRateAmount: number;
  invoiced: boolean;
  paid: boolean;
  paymentDate: string;
}

// Custom hook to manage commissions data
const useCommissionsData = () => {
  const [commissions, setCommissions] = useState<CommissionData[]>([]);

  // Load commissions data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('CommissionFormData') || '[]');
    setCommissions(storedData);
  }, []);

  // Add new commission data
  const addCommission = (newCommission: CommissionData) => {
    const updatedCommissions = [...commissions, newCommission];
    setCommissions(updatedCommissions);
    localStorage.setItem('CommissionFormData', JSON.stringify(updatedCommissions));
  };

  // Fetch a commission by ID
  const getCommissionById = (id: number) => {
    return commissions.find(commission => commission.commissionId === id);
  };

  // Update an existing commission by ID
  const updateCommission = (id: number, updatedData: Partial<CommissionData>) => {
    const updatedCommissions = commissions.map(commission =>
      commission.commissionId === id ? { ...commission, ...updatedData } : commission
    );
    setCommissions(updatedCommissions);
    localStorage.setItem('CommissionFormData', JSON.stringify(updatedCommissions));
  };

  // Delete a commission by ID
  const deleteCommission = (id: number) => {
    const updatedCommissions = commissions.filter(commission => commission.commissionId !== id);
    setCommissions(updatedCommissions);
    localStorage.setItem('CommissionFormData', JSON.stringify(updatedCommissions));
  };

  // Refetch commissions data from local storage
  const refetch = () => {
    const storedData = JSON.parse(localStorage.getItem('CommissionFormData') || '[]');
    setCommissions(storedData);
  };

  return { commissions, addCommission, getCommissionById, updateCommission, deleteCommission, refetch };
};

export default useCommissionsData;
