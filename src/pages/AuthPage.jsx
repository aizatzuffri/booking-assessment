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
        <div style={{
            backgroundImage: 'linear-gradient(to bottom, #f2f2f2, #cccccc)',
            padding: '30px',

        }}>
            <Row>
                <Col className="p-4 text-center">
                    <Container >
                        <p className="mt-5" style={{ fontSize: 64 }}>Welcome to TinyHomes</p>
                        <h2 className="mt-5" style={{ fontSize: 31 }}>Small but Spacious</h2>
                        <h2 className="mb-5" style={{ fontSize: 20 }}>Rent TinyHomes today!</h2>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col className="p-4 text-center">
                    <Container>
                        <img
                            src="https://thl-images.b-cdn.net/662494EA-F93E-4DEC-84A8-3CF210A72C00_wAkgau3Plx1zOdYZ8q5RODeZZ0EV59.jpeg?width=1200&height=1200&aspect_ratio=auto"
                            alt="TinyHomes1"
                            width="300"
                            height="250"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '5px',
                                margin: '5px'
                            }}
                        />
                        <img
                            src="https://thl-images.b-cdn.net/5CD26707-F16F-431F-9B4C-B3D045EF3A56_8xAW8CdD9O8verJlzGYlwOPdp6n0Gz.jpeg?width=1200&height=1200&aspect_ratio=auto"
                            alt="TinyHomes1"
                            width="300"
                            height="250"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '5px',
                                margin: '5px'
                            }}
                        />
                        <img
                            src="https://thl-images.b-cdn.net/4A639C18-8933-40A0-8181-5E6F983B5F6D_1oAB5ud7ev5nMlyVoqNMpwJZgBPvw0.jpeg?width=1200&height=1200&aspect_ratio=auto"
                            alt="TinyHomes1"
                            width="300"
                            height="250"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '5px',
                                margin: '5px'
                            }}
                        />
                        <img
                            src="https://thl-images.b-cdn.net/41A81BB7-1ED2-4D85-8C90-3367AABFEA43_GoZgBu1a1jDRw5RjP3R5wEqxllxBlN.jpeg?width=1200&height=1200&aspect_ratio=auto"
                            alt="TinyHomes1"
                            width="300"
                            height="250"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '5px',
                                margin: '5px'
                            }}
                        />
                        <img
                            src="https://thl-images.b-cdn.net/B6987356-33EA-412B-A040-6C2A3F890C58_rPpJWCoRevr5PZ6pLDLqDBLjPEVEV.jpeg?width=1200&height=1200&aspect_ratio=auto"
                            alt="TinyHomes1"
                            width="300"
                            height="250"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '5px',
                                margin: '5px'
                            }}
                        />
                        <img
                            src="https://thl-images.b-cdn.net/C4AA44F0-0769-4938-99E5-002EB1A60E02_xNAjDc4pmgAPqoZDJmzy0LR71RAMYW.jpeg?width=1200&height=1200&aspect_ratio=auto"
                            alt="TinyHomes1"
                            width="300"
                            height="250"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '5px',
                                margin: '5px'
                            }}
                        />
                        <img
                            src="https://thl-images.b-cdn.net/EEB344E5-6F89-4476-9774-C6E1CA35BAFC_AZAr8tLkGzZ8apRV8d6r4e4ed6pogp.jpeg?width=1200&height=1200&aspect_ratio=auto"
                            alt="TinyHomes1"
                            width="300"
                            height="250"
                            style={{
                                border: '2px solid #000',
                                borderRadius: '5px',
                                margin: '5px'
                            }}
                        />
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="p-4">
                    <Container >
                        <h2 className="mt-5" style={{ fontSize: 40 }}>Features</h2>
                        <p style={{ fontSize: 20 }}>
                            • Washer/dryer connection
                        </p>
                        <p style={{ fontSize: 20 }}>
                            • Metal roof
                        </p>
                        <p style={{ fontSize: 20 }}>
                            • Flush toilet
                        </p>
                        <p className="mb-5" style={{ fontSize: 20 }}>
                            • 3rd party certification
                        </p>
                    </Container>
                </Col>
                <Col sm={6} className="p-4">
                    <Container>
                        <h2 className="mt-5" style={{ fontSize: 40 }}>Details</h2>
                        <p style={{ fontSize: 20 }}>
                            • Bedrooms: 1
                        </p>
                        <p style={{ fontSize: 20 }}>
                            • Lofts:	1
                        </p>
                        <p style={{ fontSize: 20 }}>
                            • Bathrooms:	1
                        </p>
                        <p style={{ fontSize: 20 }}>
                            • Size:	224sq ft
                        </p>
                        <p style={{ fontSize: 20 }}>
                            • Length:	28 ft
                        </p>
                        <p style={{ fontSize: 20 }}>
                            • Width:	8 ft
                        </p>
                        <p style={{ fontSize: 20 }}>
                            • Height:	13.5 ft
                        </p>
                        <p className="mb-5" style={{ fontSize: 20 }}>
                            • Weight:	12000 lb
                        </p>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col className="p-4 text-center">
                    <Container>
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
                                variant="primary outline-dark"
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

        </div>
    )
}