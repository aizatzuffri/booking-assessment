import { Container, Spinner } from "react-bootstrap";

import Layout from "../components/Layout";
import ProfileBookingCard from "../components/ProfileBookingCard";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsByUser } from "../features/bookings/bookingsSlice";

export default function BookingsPage() {
    // const [bookings, setBookings] = useState([]);
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.bookings.bookings);
    const loading = useSelector((state) => state.bookings.loading);

    // Fetch bookings based on user id
    // const fetchBookings = (userId) => {
    //     fetch(
    //         `https://29197e44-3dea-4ae8-b0c1-36216e013e5b-00-3nlshro0xklic.janeway.repl.co/bookings/user/${userId}`
    //     )
    //         .then((response) => response.json())
    //         .then((data) => setBookings(data))
    //         .catch((error) => console.error("Error:", error));
    // };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            dispatch(fetchBookingsByUser(userId));
        }
    }, [dispatch]);


    return (
        <>
            <Layout />
            <Container className="mt-3">
                <h2>Your Bookings</h2>
                {loading && (
                    <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
                )}
                {bookings.length > 0 && bookings.map((booking) => (
                    <ProfileBookingCard
                        key={booking.id}
                        date={booking.date}
                        time={booking.time}
                        guest={booking.guest}
                    />
                ))}
            </Container>
        </>
    );
}