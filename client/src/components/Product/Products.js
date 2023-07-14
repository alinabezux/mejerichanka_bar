import {useEffect} from "react";
import {Product} from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../../redux";


const Products = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(state => state.productsReducer);

    useEffect((category, type) => {
        dispatch(productsActions.getAll(category, type))
    }, [dispatch]);


    return (
        <div className="d-flex flex-row flex-wrap">
            {products.map((product) => (
                <Product key={product.id} product={product}/>
            ))}
        </div>
    );
};

export {Products}