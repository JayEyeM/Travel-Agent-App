// BookingForm interface
export interface bookingFormData {
  id: number;
  travelDate: string;
  clientFinalPaymentDate: string;
  supplierFinalPaymentDate: string;
  bookingDate: string;
  invoicedDate: string;
  confirmationNumbers: string[];
  namesDateOfBirths: { name: string; dateOfBirth: string }[];
  mailingAddress: string;
  phoneNumbers: string[];
  emailAddresses: string[];
  significantDates: string[];
  bookingId?: string;
  checklists?: {
    [key: string]: boolean;
  };
}

// NewClientFormData interface
export interface newClientFormData {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientPostalCode: string;
  clientStreetAddress: string;
  clientCity: string;
  clientProvince: string;
  clientCountry: string;
  notes: string;
  invoiced: boolean;
  paid: boolean;
  paymentDate: string;
  finalPaymentDate: string;
  dateCreated: string;
  bookings: bookingFormData[];
}
