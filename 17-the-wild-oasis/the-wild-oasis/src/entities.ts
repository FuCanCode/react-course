type Cabin = {
  created_at: Date;
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

type Guest = {
  countryFlag?: string;
  email: string;
  fullName: string;
  id: number;
  nationalID: string;
  nationality: string;
};

type Booking = {
  cabinId: number;
  cabinPrice: number;
  created_at: Date;
  endDate: Date;
  extrasPrice: number;
  guestId: number;
  hasBreakfast: boolean;
  id: number;
  isPaid: number;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: Date;
  status: "unconfimred" | "confirmed";
  totalPrice: number;
};

type Settings = {
  breakfastPrice: number;
  created_at: Date;
  id: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
};

export type { Cabin, Guest, Booking, Settings };
