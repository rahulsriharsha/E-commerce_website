import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register(){

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	
	const [isActive, setIsActive] = useState(false);


	console.log(email);
	console.log(password1);
	console.log(password2);

	
	function registerUser(e) {
		e.preventDefault();

	    fetch(`https://s42-45.onrender.com/users/checkEmail`, {
	        method: "POST",
	        headers: {
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({
	            email: email
	        })
	    })
	    .then(res => res.json())
	    .then(data => {

	        console.log(data);

	        if(data === true){

	            Swal.fire({
	                title: 'Duplicate email found',
	                icon: 'error',
	                text: 'Please provide a different email.'   
	            });

	        } else {

	            fetch(`https://s42-45.onrender.com/users/register`, {
	                method: "POST",
	                headers: {
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({
	                    // firstName: firstName,
	                    // lastName: lastName,
	                    email: email,
	                    password: password1,
	                    mobileNo: mobileNo
	                    
	                })
	            })
	            .then(res => res.json())
	            .then(data => {

	                console.log(data);

	                if(data === true){

	                    // Clear input fields
	                    setFirstName('');
	                    setLastName('');
	                    setEmail('');
	                    setMobileNo('');
	                    setPassword1('');
	                    setPassword2('');

	                    Swal.fire({
	                        title: 'Registration successful',
	                        icon: 'success',
	                        text: 'Welcome to Zuitt!'
	                    });

	                 
	                    navigate("/login");

	                } else {

	                    Swal.fire({
	                        title: 'Something wrong',
	                        icon: 'error',
	                        text: 'Please try again.'   
	                    });

	                };

	            })
	        };

	    })

	}


	useEffect(() => {

	    
	    if((email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)){
	        setIsActive(true);
	    } else {
	        setIsActive(false);
	    }

	}, [email, password1, password2]);

	return(
		( user.id !== null ) ?
		<Navigate to="/products" />
		:
		<Form onSubmit={(e) => registerUser(e)}>
		  <h1 className="text-center">Register</h1>
		  <div className="textBox">
	      <Form.Group className="mb-3 dumbText" controlId="userEmail">	       
	        <Form.Label>Email address</Form.Label>
	        <Form.Control 
	        	type="email" 
	        	placeholder="Enter your email"
	        	value={email}
	        	onChange={e => setEmail(e.target.value)}
	        	required 
	        />
	      </Form.Group>
	      <Form.Group className="mb-3 dumbText" controlId="password1">
	        <Form.Label>Password</Form.Label>
	        <Form.Control 
	        	type="password" 
	        	placeholder="Enter your password"
	        	value={password1}
	        	onChange={e => setPassword1(e.target.value)}
	        	required
	        />
	      </Form.Group>
	      <Form.Group className="mb-3 dumbText" controlId="password2">
	        <Form.Label>Verify Password</Form.Label>
	        <Form.Control 
	        	type="password" 
	        	placeholder="Verify your password" 
	        	value={password2}
	        	onChange={e => setPassword2(e.target.value)}
	        	required
	        />
	      </Form.Group>
	      </div>
	      <div className="dumbButton">
		      {/* conditional render submit button based on isActive state */}
		      { isActive ? 
				<Button variant="primary" type="submit" id="submitBtn">
			        Submit
			    </Button>
			    :
		    	<Button variant="danger" type="submit" id="submitBtn" disabled>
		            Submit
		        </Button>
		      }
	      </div>
	      
		</Form>
	)
}