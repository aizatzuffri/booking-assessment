import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export default function AuthPage() {
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate("/bookings");
    }, [currentUser, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
        } catch (error) {
            console.error(error);
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => setModalShow(null);

    return (
        <Row>
            <Col className="p-4 text-center">
                <Container>
                    <p className="mt-5" style={{ fontSize: 64 }}>Welcome to TinyHomes</p>
                    <h2 className="my-5" style={{ fontSize: 31 }}>Small but Spacious</h2>

                    <Col className="gap-2 text-center">
                        <Button
                            className="rounded-pill"
                            variant="primary outline-dark"
                            onClick={handleGoogleLogin}
                        >
                            <i className="bi bi-google"></i> Sign up with Google
                        </Button>
                        <p style={{ textAlign: "center" }}>or</p>
                        <Button
                            className="rounded-pill"
                            variant="primary outline-dark"
                            onClick={handleShowSignUp}>
                            Create an account
                        </Button>
                        <p style={{ fontSize: "12px" }}>
                            By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use.
                        </p>

                        <p className="mt-5" style={{ fontWeight: "bold" }}>
                            Already have an account?
                        </p>
                        <Button
                            className="rounded-pill"
                            variant="outline-primary"
                            onClick={handleShowLogin}>
                            Sign in
                        </Button>
                    </Col>
                </Container>
                <Modal
                    show={modalShow !== null}
                    onHide={handleClose}
                    animation={false}
                    centered
                >
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === "SignUp"
                                ? "Create your account"
                                : "Log in to your account"}
                        </h2>
                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email"
                                    placeholder="Enter username"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                            </p>

                            <Button className="rounded-pill" type="submit">
                                {modalShow === "SignUp" ? "Sign up" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    )
}