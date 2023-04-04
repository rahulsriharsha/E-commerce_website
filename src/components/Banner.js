import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {

    console.log(data);
    const {title, content, destination, label} = data;

    return (
        <Row>
            <Col>
                <h1>{title}</h1>
                <p>{content}</p>
                <Link to={destination}>{label}</Link>
            </Col>
        </Row>
    )
}