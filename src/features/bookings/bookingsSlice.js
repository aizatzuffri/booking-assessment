import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL =
    "https://29197e44-3dea-4ae8-b0c1-36216e013e5b-00-3nlshro0xklic.janeway.repl.co";

// Async thunk for fetching a user's bookings
export const fetchBookingsByUser = createAsyncThunk(
    "bookings/fetchBookingsByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/bookings/user/${userId}`);
        return response.json();
    }
);

// Async thunk to add booking
export const saveBooking = createAsyncThunk(
    "bookings/saveBooking",
    async ({ bookingDate, bookingTime, bookingGuest }) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            date: bookingDate,
            time: bookingTime,
            guest: bookingGuest,
            user_id: userId,
        };

        const response = await axios.post(`${BASE_URL}/bookings`, data);
        return response.data;
    }
);


// Slice
const bookingsSlice = createSlice({
    name: "bookings",
    initialState: { bookings: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBookingsByUser.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
        }),
            builder.addCase(saveBooking.fulfilled, (state, action) => {
                state.bookings = [action.payload, ...state.bookings];
            });
    },
});

export default bookingsSlice.reducer;