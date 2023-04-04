import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductsView() {

	const { user } = useContext(UserContext);
	console.log(user.id)

	
	const navigate = useNavigate();


		const [ name, setName ] = useState("");
		const [ description, setDescription ] = useState("");
		const [ price, setPrice ] = useState(0);
		
	  const [ totalAmount, setAmount ] = useState(price);
	  const [quantity, setQuantity] = useState(1);

	  function increase() {
	 
	    setQuantity(quantity + 1);
	    console.log(quantity);
	    setAmount(price*quantity);
		console.log(totalAmount); 
	   
	  }

	  function decrease() {
	    setQuantity(quantity - 1);
	    console.log(quantity);
	    setAmount(price*quantity);
		console.log(totalAmount); 
	  }


	const { productsId } = useParams();

	

	const checkout = (productId) => {
		
	    
		fetch('https://s42-45.onrender.com/users/checkout', {
			method: "POST",
			headers:{
				"Content-Type" : "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				userId : user.id,
				totalAmount: totalAmount,
				products : [
					{
						id: productsId,
						quantity: quantity
					}
				]

			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if (data === true){
				Swal.fire({
					title: "Product ordered successfully",
					icon: "success",
					text: "Your product will be delivered within few days"
				})
				navigate("/products");
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please try again."
				})
			}
		})
	}

	useEffect(()=> {
		console.log(productsId);

		fetch(`https://s42-45.onrender.com/products/${productsId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
			
		})

	},[productsId]);

	return(
		<Container className="mt-5">
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Card>
					  <Card.Body className="text-center">
					    <Card.Title>{name}</Card.Title>
					    <Card.Subtitle>Description:</Card.Subtitle>
					    <Card.Text>{description}</Card.Text>
					    <Card.Subtitle>Price:</Card.Subtitle>
					    <Card.Text>PhP {price}</Card.Text>
					    <Card.Subtitle>Quantity :{quantity}</Card.Subtitle>
					    <Card.Text>
					    <button classname="button" onClick={decrease}>-</button>
					    <button classname="button" onClick={increase}>+</button>
					    </Card.Text>
					    
					          
					    { (user.id !== null) ? 
					    	<Button variant="primary" block onClick={() => checkout(productsId)}>Order</Button>
				    	:
					    	<Link className="btn btn-danger btn-block" to="/login" >Login to Order</Link>
				    	}
					  </Card.Body>		
					</Card>
				</Col>
			</Row>
		</Container>
	)
}