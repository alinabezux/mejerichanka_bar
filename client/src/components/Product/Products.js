import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";

import {Product} from "./Product";
import {productsActions} from "../../redux";

const Products = () => {
    const dispatch = useDispatch();

    const {products, error} = useSelector(state => state.productsReducer);
    const {selectedCategory} = useSelector(state => state.categoriesReducer);
    const {selectedType} = useSelector(state => state.typesReducer);


    useEffect(() => {
        dispatch(productsActions.getAll({
            category: selectedCategory.category,
            type: selectedType.type,
            isGettingAll: true
        }))
    }, [dispatch, selectedCategory.category, selectedType.type]);


    const filteredProducts = useMemo(() => {
        if (selectedCategory.category === "Головне меню") {
            return products.filter(product => selectedCategory.category === product.category && selectedType.type === product.type)
        } else {
            return products.filter(product => selectedCategory.category === product.category)
        }
    }, [products, selectedCategory, selectedType])


    const scroll = document.getElementById("scrollTo");
    if (scroll) {
        scroll.scrollIntoView({behavior: "smooth"});
    }


    return (
        <Container className="products m-3" id="scrollTo">
            {
                filteredProducts.map(product =>
                    <Product key={product._id} product={product}/>)
            }
            {error && <h1>Error:(</h1>}
        </Container>
    );
};

export {Products}
