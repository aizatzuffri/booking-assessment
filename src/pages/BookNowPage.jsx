import { Button, Container, Form } from "react-bootstrap";
import Layout from "../components/Layout";
import { useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveBooking } from "../features/bookings/bookingsSlice";

export default function BookNowPage() {
    const navigate = useNavigate();
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [bookingGuest, setBookingGuest] = useState("");
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(saveBooking({ bookingDate, bookingTime, bookingGuest }));
        navigate("/bookings")
        // Get stored JWT Token
        // const token = localStorage.getItem("authToken");

        // Decode the token to fetch user id
        // const decode = jwtDecode(token);
        // const userId = decode.id;

        // Prepare data to be sent
        // const data = {
        //     date: bookingDate,
        //     time: bookingTime,
        //     guest: bookingGuest,
        //     user_id: userId,
        // };

        // Make your API call here
        // axios
        //     .post("https://29197e44-3dea-4ae8-b0c1-36216e013e5b-00-3nlshro0xklic.janeway.repl.co/bookings", data)
        //     .then((response) => {
        //         console.log("Success:", response.data);
        //         navigate("/bookings");
        //     })
        //     .catch((error) => {
        //         console.error("Error", error);
        //     });

    }
    return (
        <>
            <Layout />
            <Container className="mt-3">
                <h2>Book Now!</h2>
                <Form>
                    <Form.Group controlId="bookingDate">
                        Date: DD-MM-YYYY
                        <Form.Control
                            placeholder="Put in your desired date"
                            type="text"
                            onChange={(e) => setBookingDate(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="bookingTime">
                        Time: HH:MM
                        <Form.Control
                            placeholder="Put in your desired time"
                            type="text"
                            onChange={(e) => setBookingTime(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="bookingGuest">
                        Guest:
                        <Form.Control
                            placeholder="Put in number of guests"
                            type="number"
                            onChange={(e) => setBookingGuest(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                </Form>
                <Button
                    variant="primary"
                    className="rounded-pill"
                    onClick={handleSave}
                >
                    Confirm
                </Button>
            </Container>
        </>
    )
}