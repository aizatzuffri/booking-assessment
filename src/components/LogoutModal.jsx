import { getAuth } from "firebase/auth";
import { useState } from "react"
import { Button, Modal } from "react-bootstrap";


export default function LogoutModal() {
    const auth = getAuth();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <>
            <Button className="border border-2" variant="primary" onClick={handleShow}>
                Logout
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}