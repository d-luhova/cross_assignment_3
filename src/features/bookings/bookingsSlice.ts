import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBookingThunk } from "./bookingsThunks";

export type Booking = {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone?: string;
};

type BookingsState = {
  items: Booking[];
};

const initialState: BookingsState = {
  items: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,

  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.items = action.payload;
    },

    addBooking: (state, action: PayloadAction<Booking>) => {
      state.items.push(action.payload);
    },

    removeBooking: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (b) => b.id !== action.payload
      );
    },
  },
  
  extraReducers: (builder) => {
    builder.addCase(createBookingThunk.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const {
  setBookings,
  addBooking,
  removeBooking,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;