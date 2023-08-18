import {useEffect, useMemo} from "react";
import {Product} from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {productsActions, typesActions} from "../../redux";


const Products = () => {
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector(state => state.productsReducer);
    const {selectedCategory} = useSelector(state => state.categoriesReducer);
    const {selectedType} = useSelector(state => state.typesReducer);


    useEffect(() => {
        dispatch(productsActions.getAll(selectedCategory.category, selectedType.type))
    }, [dispatch, selectedCategory.category, selectedType.type]);


    const filteredProducts = useMemo(() => {
        if (selectedCategory.category === "Головне меню") {
            return products.filter(product => selectedCategory.category === product.category && selectedType.type === product.type)
        } else {
            // dispatch(typesActions.setSelectedType({}))
            return products.filter(product => selectedCategory.category === product.category)
        }
    }, [ products, selectedCategory, selectedType])


    console.log("filteredProducts: ", filteredProducts)
    console.log("selectedCategory: ", selectedCategory)
    console.log("selectedType: ", selectedType)
    console.log("---")
    return (
        <div className="products m-3">
            {
                filteredProducts.map(product =>
                    <Product key={product._id} product={product}/>)
            }
            {loading && <h1>Loading...........</h1>}
            {error && <h1>Error:(</h1>}
        </div>
    );
};

export {Products}