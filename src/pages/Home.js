import { Fragment } from 'react';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';

export default function Home(){
    const data = {
        title: "Online Shopping",
        content: "All types of products available",
        destination: "/products",
        label: "Order now!"
    }

    return (
        <Fragment>
            <Banner data={data}/>
            <Highlights />
        </Fragment>
    )
}
