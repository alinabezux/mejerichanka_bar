import {useEffect} from "react";
import {Product} from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../../redux";


const Products = () => {
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector(state => state.productsReducer);
    const {selectedCategory} = useSelector(state => state.categoriesReducer);
    const {selectedType} = useSelector(state => state.typesReducer);


    useEffect(() => {
        dispatch(productsActions.getAll(selectedCategory.category, selectedType.type))
    }, [dispatch, selectedCategory.category, selectedType.type]);

    const filteredProducts = products.filter(product => selectedCategory.category === product.category && selectedType.type === product.type)

    return (
        <div className="products m-3">
            {
                filteredProducts.map(product =>
                    <Product key={product.id} product={product}/>)
            }
            {loading && <h1>Loading...........</h1>}
            {error && <h1>Error:(</h1>}
        </div>
    );
};

export {Products}