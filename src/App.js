import AppNavbar from './components/AppNavbar';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductsView from './components/ProductsView';
import Error from './pages/Error';
import './App.css';
import { UserProvider } from './UserContext';

function App() {

  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  };


  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user])

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
     <Router>
       <Container fluid>
         <AppNavbar/>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/products" element={<Products />} />

          <Route path="/products/:productsId" element={<ProductsView />} />

           <Route path="/logout" element={<Logout />} />
           <Route path="/register" element={<Register />} />
           <Route path="/login" element={<Login />} />
           <Route path="*" element={<Error />} />
         </Routes>
       </Container>
     </Router>
    </UserProvider>
    
  );
}

export default App;
