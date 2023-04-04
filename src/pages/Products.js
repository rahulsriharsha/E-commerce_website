import { Fragment, useEffect, useState, useContext } from 'react';
import AdminView from '../components/AdminView';
// import coursesData from '../data/coursesData';
import UserView from '../components/UserView';
import UserContext from '../UserContext';

export default function Products() {

    const { user } = useContext(UserContext);

  
    const [products, setProducts] = useState([]);

    
    const fetchData = () => {

        fetch(`https://s42-45.onrender.com/products/all`)
        .then(res => res.json())
        .then(data => {

            setProducts(data);

        });

    }

   
    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <Fragment>
            
            {(user.isAdmin === true)
                ? <AdminView productsData={products} fetchData={fetchData}/>
                : <UserView productsData={products}/>
            }
        </Fragment>
    )

}