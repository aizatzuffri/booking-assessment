import { Button, Container, Form, InputGroup } from "react-bootstrap";
import Layout from "../components/Layout";
import { useContext, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveBooking } from "../features/bookings/bookingsSlice";
import { AuthContext } from "../components/AuthProvider";

export default function BookNowPage() {
    const navigate = useNavigate();
    const [bookingName, setBookingName] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [bookingPhone, setBookingPhone] = useState("");
    const [bookingGuest, setBookingGuest] = useState("");
    const bookingDeposit = 300;
    const [bookingPayment, setBookingPayment] = useState("");

    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    const [error, setError] = useState('');


    const handleSave = () => {
        if (!bookingName || !bookingDate || !bookingTime || !bookingPhone || !bookingGuest || !bookingPayment) {
            setError("Please fill out all fields.");
        } else {
            dispatch(saveBooking({ userId, bookingName, bookingDate, bookingTime, bookingPhone, bookingGuest, bookingDeposit, bookingPayment }));
            navigate("/bookings")
        }
    };

    return (
        <>
            <Layout />
            <Container className="mt-3">
                <h2>Book Now!</h2>
                {error && <p className="text-danger">{error}</p>}
                <Form>
                    <Form.Group controlId="bookingName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            placeholder="Put in your name"
                            type="text"
                            onChange={(e) => setBookingName(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="bookingDate">
                        <Form.Label>Date:</Form.Label>
                        <Form.Control
                            placeholder="Put in your desired date"
                            type="date"
                            onChange={(e) => setBookingDate(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="bookingTime">
                        <Form.Label>Time:</Form.Label>
                        <Form.Control
                            placeholder="Put in your desired time"
                            type="time"
                            onChange={(e) => setBookingTime(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="bookingPhone">
                        <Form.Label>Phone Number:</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>+60</InputGroup.Text>
                            <Form.Control
                                placeholder="Enter a phone number"
                                type="text"
                                value={bookingPhone}
                                maxLength={10}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                    setBookingPhone(input);
                                }}
                            />
                        </InputGroup>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="bookingGuest">
                        <Form.Label>Number of Guests:</Form.Label>
                        <Form.Control
                            placeholder="Put in number of guests"
                            type="number"
                            onChange={(e) => setBookingGuest(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="bookingDeposit">
                        <Form.Label>Deposit:</Form.Label>
                        <Form.Control type="text" value={`$${bookingDeposit}`} readOnly />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="bookingPayment">
                        <Form.Label>Payment Method:</Form.Label>
                        <Form.Control as="select" type="text" value={bookingPayment} onChange={(e) => setBookingPayment(e.target.value)}>
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash">Cash</option>
                        </Form.Control>
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