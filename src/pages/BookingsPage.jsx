import { Container, Spinner } from "react-bootstrap";
import Layout from "../components/Layout";
import ProfileBookingCard from "../components/ProfileBookingCard";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsByUser } from "../features/bookings/bookingsSlice";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function BookingsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);

    const bookings = useSelector((state) => state.bookings.bookings);
    const loading = useSelector((state) => state.bookings.loading);

    // Check if currentuser is logged in
    if (!currentUser) {
        navigate("/login");
    }

    useEffect(() => {
        dispatch(fetchBookingsByUser(currentUser.uid));
    }, [dispatch, currentUser]);


    return (
        <>
            <Layout />
            <Container className="mt-3">
                <h2>Your Bookings</h2>
                {loading && (
                    <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
                )}
                {bookings.length > 0 && bookings.map((booking, index) => (
                    <ProfileBookingCard
                        key={booking.id + index} // Use a combination of booking ID and index for uniqueness
                        booking={booking}
                    />
                ))}

            </Container>
        </>
    );
}