import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import UpdateModal from "./UpdateModal";
import CancelModal from "./CancelModal";

export default function ProfileBookingCard({ booking }) {
    const { id: bookingId, name, date, time, phone_number, guest, deposit, payment } = booking;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowCancelModal = () => setShowCancelModal(true);
    const handleCloseCancelModal = () => setShowCancelModal(false);

    return (
        <>
            <Row
                className="p-3"
                style={{
                    borderTop: "1px solid #D3D3D3",
                    borderBottom: "1px solid #D3D3D3"
                }}
            >
                <Col>
                    <strong>Booking</strong>
                    <br />
                    <p> Name: {name} </p>
                    <p> Date: {date} </p>
                    <p> Time: {time} </p>
                    <p> Phone Number: {phone_number} </p>
                    <p> Guests: {guest} </p>
                    <p> Deposit: ${deposit} </p>
                    <p> Payment Method: {payment} </p>

                    <Button variant="secondary" onClick={handleShowUpdateModal}>
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button className="ms-3" variant="danger" onClick={handleShowCancelModal}>
                        <i className="bi bi-trash"></i>
                    </Button>
                    <UpdateModal
                        show={showUpdateModal}
                        handleClose={handleCloseUpdateModal}
                        bookingId={bookingId}
                        originalBookingName={name}
                        originalBookingDate={date}
                        originalBookingTime={time}
                        originalBookingPhone={phone_number}
                        originalBookingGuest={guest}
                        originalBookingPayment={payment}
                    />
                    <CancelModal
                        show={showCancelModal}
                        handleClose={handleCloseCancelModal}
                        bookingId={bookingId}
                    />
                </Col>
            </Row>
        </>
    )
}