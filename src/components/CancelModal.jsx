import { useContext } from "react"
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { deleteBooking } from "../features/bookings/bookingsSlice";
import { Button, Modal } from "react-bootstrap";

export default function CancelModal({
    show,
    handleClose,
    bookingId,
}) {
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;

    const handleDelete = () => {
        dispatch(deleteBooking({ userId, bookingId }));
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel reservation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to cancel your reservation?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Yes
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}