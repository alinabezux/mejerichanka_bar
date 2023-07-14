import {useEffect} from "react";
import {Product} from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../../redux";


const Products = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state.productsReducer);

    useEffect(() => {
        dispatch(productsActions.getAll())
    }, [dispatch]);
    // const filteredProducts = products.filter((product) => {
    //     if (type) {
    //         return product.category === category && product.type === type;
    //     } else {
    //         return product.category === category;
    //     }
    // });

    return (
        <div className="d-flex flex-row flex-wrap">
            {products.map((product) => (
                <Product key={product.id} product={product}/>
            ))}
        </div>
    );
};

export {Products}