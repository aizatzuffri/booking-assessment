import { Col, Row } from "react-bootstrap";

export default function ProfileBookingCard({ date, time, guest }) {

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
                    <p> Date: {date} </p>
                    <p> Time: {time} </p>
                    <p> Guests: {guest} </p>
                </Col>
            </Row>
        </>
    )
}