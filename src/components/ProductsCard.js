import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';    

export default function ProductsCard({productsProp}) {
    
    console.log(productsProp)

    const { _id, name, description, price } = productsProp;


    return (
                <Card className="cardHighlight p-3 productPic">
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle>Description:</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <Card.Subtitle>Price:</Card.Subtitle>
                        <Card.Text>Rs {price}</Card.Text>
                        <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
                    </Card.Body>
                </Card>
    )
}

ProductsCard.propTypes = {
    products : PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}
