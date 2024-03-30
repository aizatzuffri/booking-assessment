import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { updateBooking } from "../features/bookings/bookingsSlice";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

export default function UpdateModal({
    show,
    handleClose,
    bookingId,
    originalBookingName,
    originalBookingDate,
    originalBookingTime,
    originalBookingPhone,
    originalBookingGuest,
    originalBookingPayment
}) {
    const [newBookingName, setNewBookingName] = useState(originalBookingName);
    const [newBookingDate, setNewBookingDate] = useState(originalBookingDate);
    const [newBookingTime, setNewBookingTime] = useState(originalBookingTime);
    const [newBookingPhone, setNewBookingPhone] = useState(originalBookingPhone);
    const [newBookingGuest, setNewBookingGuest] = useState(originalBookingGuest);
    const [newBookingPayment, setNewBookingPayment] = useState(originalBookingPayment);

    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    const handleUpdate = () => {
        dispatch(updateBooking({ userId, bookingId, newBookingName, newBookingDate, newBookingTime, newBookingPhone, newBookingGuest, newBookingPayment }));
        handleClose();
        setNewBookingName(newBookingName);
        setNewBookingDate(newBookingDate);
        setNewBookingTime(newBookingTime);
        setNewBookingPhone(newBookingPhone);
        setNewBookingGuest(newBookingGuest);
        setNewBookingPayment(newBookingPayment);

    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update your reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="bookingName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                defaultValue={originalBookingName}
                                type="text"
                                onChange={(e) => setNewBookingName(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="bookingDate">
                            <Form.Label>Date: DD-MM-YYYY</Form.Label>
                            <Form.Control
                                defaultValue={originalBookingDate}
                                type="text"
                                onChange={(e) => setNewBookingDate(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="bookingTime">
                            <Form.Label>Time: HH:MM</Form.Label>
                            <Form.Control
                                defaultValue={originalBookingTime}
                                type="text"
                                onChange={(e) => setNewBookingTime(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="bookingPhone">
                            <Form.Label>Phone Number:</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>+60</InputGroup.Text>
                                <Form.Control
                                    defaultValue={originalBookingPhone}
                                    type="number"
                                    onChange={(e) => setNewBookingPhone(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <br />
                        <Form.Group controlId="bookingGuest">
                            <Form.Label>Number of Guests:</Form.Label>
                            <Form.Control
                                defaultValue={originalBookingGuest}
                                type="number"
                                onChange={(e) => setNewBookingGuest(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="bookingPayment">
                            <Form.Label>Payment Method:</Form.Label>
                            <Form.Control as="select" type="text" defaultValue={originalBookingPayment} onChange={(e) => setNewBookingPayment(e.target.value)}>
                                <option value="">Select Payment Method</option>
                                <option value="credit_card">Credit Card</option>
                                <option value="debit_card">Debit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="cash">Cash</option>
                            </Form.Control>
                        </Form.Group>
                        <br />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}