import { Fragment, useState, useEffect } from 'react'
import ProductsCard from "./ProductsCard";

export default function UserView({productsData}) {

    // console.log(coursesData);

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const productsArr = productsData.map(products => {
     
            if(products.isActive === true){
                return (
                    <ProductsCard productsProp={products} key={products._id}/>
                )
            }else{
                return null;
            }
        });

        
        setProducts(productsArr);

    }, [productsData]);

    return(
        <Fragment>
            {products}
        </Fragment>
    );
}
