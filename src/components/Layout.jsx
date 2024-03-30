import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import LogoutModal from "./LogoutModal";

export default function Layout() {
    return (
        <>
            <Navbar sticky='top' bg='light' style={{ fontWeight: "bold" }}>
                <Container>
                    <Navbar.Brand href="/">TinyHomes</Navbar.Brand>
                    <Nav className="me-4">
                        <Nav.Link href="/bookings">
                            Bookings
                        </Nav.Link>
                        <Nav.Link className="me-3" href="/booknow">
                            Book Now!
                        </Nav.Link>
                        <Nav>
                            <LogoutModal />
                        </Nav>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}