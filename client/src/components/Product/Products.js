import {useEffect, useState} from "react";

import {productsService} from "../../services";
import {Product} from "./Product";


const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productsService.getAll().then(({data}) => setProducts(data))
    }, [])


    return (
        <div>
            {
                products.map(product => <Product key={product.id} product={product}/>)
            }
        </div>
    );
}

export {Products}