import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBooking } from "../../services/tablesApi";

export const createBookingThunk = createAsyncThunk(
  "bookings/createBooking",
  async (payload: any) => {
    const response = await createBooking(payload);
    return response;
  }
);