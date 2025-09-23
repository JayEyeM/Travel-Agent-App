// src/api/BookingAPIs.ts
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

// ─── Types (unchanged) ───────────────────────────────
export type UnixTimestamp = number;

export interface Booking {
  id: number;
  clientId: number;
  travelDate: UnixTimestamp;
  clientFinalPaymentDate: UnixTimestamp;
  supplierFinalPaymentDate: UnixTimestamp;
  bookingDate: UnixTimestamp;
  invoicedDate: UnixTimestamp;
  referenceCode: string;
  amount: number;
  notes: string;
  invoiced: boolean;
  paid: boolean;
  paymentDate?: UnixTimestamp;
  dateCreated: UnixTimestamp;
}

export interface Confirmation {
  id: number;
  bookingId: number;
  confirmationNumber: string;
  supplier: string;
}

export interface PersonDetail {
  id: number;
  bookingId: number;
  name: string;
  dateOfBirth: UnixTimestamp;
}

export interface SignificantDate {
  id: number;
  bookingId: number;
  date: UnixTimestamp;
}

export interface EmailAddress {
  id: number;
  bookingId: number;
  email: string;
}

export interface PhoneNumber {
  id: number;
  bookingId: number;
  phone: string;
}

// Input when creating or updating a booking
export interface BookingInput {
  booking: Omit<Booking, "id">;
  relatedData: {
    confirmations: Omit<Confirmation, "id" | "bookingId">[];
    personDetails: Omit<PersonDetail, "id" | "bookingId">[];
    significantDates: Omit<SignificantDate, "id" | "bookingId">[];
    emailAddresses: Omit<EmailAddress, "id" | "bookingId">[];
    phoneNumbers: Omit<PhoneNumber, "id" | "bookingId">[];
  };
}

// Response (booking + relations)
export interface BookingWithRelations extends Booking {
  confirmations: Confirmation[];
  personDetails: PersonDetail[];
  significantDates: SignificantDate[];
  emailAddresses: EmailAddress[];
  phoneNumbers: PhoneNumber[];
}

// ─── Helpers ──────────────────────────────────────────

// Convert API snake_case response to camelCase
function mapBookingApiResponse(b: any): BookingWithRelations {
  return {
    id: b.id,
    clientId: b.clientId ?? b.client_id, // handle both
    travelDate: b.travelDate, 
    clientFinalPaymentDate: b.clientFinalPaymentDate, 
    supplierFinalPaymentDate: b.supplierFinalPaymentDate, 
    bookingDate: b.bookingDate, 
    invoicedDate: b.invoicedDate, 
    referenceCode: b.referenceCode ?? b.reference_code, // handle both
    amount: b.amount,
    notes: b.notes,
    invoiced: b.invoiced,
    paid: b.paid,
    paymentDate: b.paymentDate, // <-- optional
    dateCreated: b.dateCreated, 
    confirmations: (b.confirmations || []).map((c: any) => ({
      id: c.id,
      bookingId: c.bookingId || c.booking_id, // handle both
      confirmationNumber: c.confirmationNumber || c.confirmation_number,
      supplier: c.supplier,
    })),
    personDetails: (b.personDetails || []).map((p: any) => ({
      id: p.id,
      bookingId: p.bookingId || p.booking_id,
      name: p.name,
      dateOfBirth: p.dateOfBirth || p.date_of_birth,
    })),
    significantDates: (b.significantDates || []).map((d: any) => ({
      id: d.id,
      bookingId: d.bookingId || d.booking_id,
      date: d.date,
    })),
    emailAddresses: (b.emailAddresses || []).map((e: any) => ({
      id: e.id,
      bookingId: e.bookingId || e.booking_id,
      email: e.email,
    })),
    phoneNumbers: (b.phoneNumbers || []).map((p: any) => ({
      id: p.id,
      bookingId: p.bookingId || p.booking_id,
      phone: p.phone,
    })),
  };
}


// ─── API Calls ──────────────────────────────────────────────

// GET all bookings
export async function getBookings(): Promise<BookingWithRelations[]> {
  const res = await fetch(`${BASE_URL}/bookings`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  const data = await res.json();
  return data.map(mapBookingApiResponse);
}

// GET booking by ID
export async function getBookingById(id: number): Promise<BookingWithRelations> {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to fetch booking ${id}`);
  const data = await res.json();
  return mapBookingApiResponse(data);
}

// POST create booking
export async function createBooking(bookingInput: BookingInput): Promise<BookingWithRelations> {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(bookingInput),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || "Failed to create booking");
  }
  const data = await res.json();
  return mapBookingApiResponse(data);
}

// PATCH update booking
export async function updateBooking(
  id: number,
  bookingInput: Partial<BookingInput>
): Promise<BookingWithRelations> {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(bookingInput),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || `Failed to update booking ${id}`);
  }
  const data = await res.json();
  return mapBookingApiResponse(data);
}

// DELETE booking
export async function deleteBooking(id: number): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || `Failed to delete booking ${id}`);
  }
  return res.json();
}
