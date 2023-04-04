import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {

    console.log(data);
    const {title, content, destination, label} = data;

    return (
        <Row>
            <Col>
                <h1 class="text-center">{title}</h1>
                <p class="text-center">{content}</p>
                <div class="text-center orderButton">
                    <Link to={destination}>{label}</Link>
                </div>
            </Col>
        </Row>
    )
}