import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Async thunk for fetching a user's bookings
export const fetchBookingsByUser = createAsyncThunk(
    "bookings/fetchBookingsByUser",
    async (userId) => {
        try {
            const bookingsRef = collection(db, `users/${userId}/bookings`);

            const querySnapshot = await getDocs(bookingsRef);
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

// Async thunk to add booking
export const saveBooking = createAsyncThunk(
    "bookings/saveBooking",
    async ({ userId, bookingName, bookingDate, bookingTime, bookingPhone, bookingGuest, bookingDeposit, bookingPayment }) => {
        try {
            const bookingsRef = collection(db, `users/${userId}/bookings`);
            const newBookingRef = doc(bookingsRef);
            console.log({ bookingName, bookingDate, bookingTime, bookingPhone, bookingGuest, bookingDeposit, bookingPayment });
            await setDoc(newBookingRef, { name: bookingName, date: bookingDate, time: bookingTime, phone_number: bookingPhone, guest: bookingGuest, deposit: bookingDeposit, payment: bookingPayment });
            const newBooking = await getDoc(newBookingRef);

            const booking = {
                id: newBooking.id,
                ...newBooking.data(),
            };

            return booking;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

// Async thunk to update booking
export const updateBooking = createAsyncThunk(
    "bookings/updateBooking",
    async ({ userId, bookingId, newBookingName, newBookingDate, newBookingTime, newBookingPhone, newBookingGuest, newBookingPayment }) => {
        try {
            // Reference to the existing post
            const bookingRef = doc(db, `users/${userId}/bookings/${bookingId}`);

            // Get the current booking data
            const bookingSnap = await getDoc(bookingRef);
            if (bookingSnap.exists()) {
                const bookingData = bookingSnap.data();

                // Update the booking data
                const updatedData = {
                    ...bookingData,
                    name: newBookingName || bookingData.name,
                    date: newBookingDate || bookingData.date,
                    time: newBookingTime || bookingData.time,
                    phone_number: newBookingPhone || bookingData.phone_number,
                    guest: newBookingGuest || bookingData.guest,
                    payment: newBookingPayment || bookingData.payment,
                };

                // Update the existing document in Firestore
                await updateDoc(bookingRef, updatedData);

                // Return the post with updated data
                const updatedBooking = { id: bookingId, ...updatedData };
                return updatedBooking;
            } else {
                throw new Error("Booking does not exist");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

// Async thunk to delete booking
export const deleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async ({ userId, bookingId }) => {
        try {
            // Reference to the post
            const bookingRef = doc(db, `users/${userId}/bookings/${bookingId}`);

            // Delete the booking
            await deleteDoc(bookingRef);

            // Return the ID of the deleted booking
            return bookingId;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);


// Slice
const bookingsSlice = createSlice({
    name: "bookings",
    initialState: { bookings: [], loading: true },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingsByUser.fulfilled, (state, action) => {
                state.bookings = action.payload;
                state.loading = false;
            })
            .addCase(saveBooking.fulfilled, (state, action) => {
                state.bookings = [action.payload, ...state.bookings];
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                const updatedBooking = action.payload;
                // Find and update the booking in the state
                const bookingIndex = state.bookings.findIndex(
                    (booking) => booking.id === updatedBooking.id
                );
                if (bookingIndex !== -1) {
                    state.bookings[bookingIndex] = updatedBooking;
                }
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                const deletedBookingId = action.payload;
                // Filter out the deleted booking from state
                state.bookings = state.bookings.filter((booking) => booking.id !== deletedBookingId);
            });
    },
});

export default bookingsSlice.reducer;