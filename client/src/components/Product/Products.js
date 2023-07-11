import {useEffect, useState} from "react";
import {productsService} from "../../services";
import {Product} from "./Product";


const Products = ({category, type}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productsService.getAll(null, null).then(({data}) => setProducts(data))
    }, [])

    const filteredProducts = products.filter((product) => {
        if (type) {
            return product.category === category && product.type === type;
        } else {
            return product.category === category;
        }
    });

    return (
        <div className="d-flex flex-row flex-wrap">
            {filteredProducts.map((product) => (
                <Product key={product.id} product={product}/>
            ))}
        </div>
    );
};

export {Products}