import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login(props) {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {

        e.preventDefault();

        fetch('https://s42-45.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            if (typeof data.access !== "undefined"){

                localStorage.setItem('token', data.access)
                retrieveUserDetails(data.access);

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to Zuitt!"
                })
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text:"Check your login credentials and try again."
                })
            }
        })

        setEmail('');
        setPassword('');

    }

    const retrieveUserDetails = (token) => {
        fetch('https://s42-45.onrender.com/users/userDetails',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
    }

    useEffect(() => {

        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);


    return (
        (user.id !== null) ?
        <Navigate to="/products" />
        :
        <Form onSubmit={(e) => authenticate(e)}>
            <h1 class="text-center">Log In</h1>
                <div class="form-container1">
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>                
                </div>

                <div class="form-container2">
                 { isActive ? 
                     <Button variant="primary" type="submit" id="submitBtn" class="my-button">
                         Submit
                     </Button>
                     : 
                     <Button variant="danger" type="submit" id="submitBtn" class="my-button"disabled>
                         Submit
                     </Button>
                 }  
                </div>
        </Form>
    )
}
