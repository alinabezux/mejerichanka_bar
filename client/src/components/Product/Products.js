import {useEffect, useState} from "react";
import {productsService} from "../../services";
import {Product} from "./Product";


const Products = () => {

    const [products, setProducts] = useState([]);
    console.log(products);


    useEffect(() => {
        productsService.getAll().then(({data}) => setProducts(data))
    }, [])


    return (
        <div>
            <h1>Products</h1>
            <hr/>
            {
                products.map(product => <Product key={product.id} product={product}/>)
            }
        </div>
    );
}

export {Products}