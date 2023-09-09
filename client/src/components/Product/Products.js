import {useEffect, useMemo} from "react";
import {Product} from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../../redux";
import {Container} from "react-bootstrap";


const Products = () => {
    const dispatch = useDispatch();
    const {products, error} = useSelector(state => state.productsReducer);
    const {selectedCategory} = useSelector(state => state.categoriesReducer);
    const {selectedType} = useSelector(state => state.typesReducer);


    useEffect(() => {
        dispatch(productsActions.getAll(selectedCategory.category, selectedType.type))
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
        scroll.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <Container className="products m-3">
            {
                filteredProducts.map(product =>
                    <Product key={product._id} product={product}/>)
            }

            {error && <h1>Error:(</h1>}
        </Container>
    );
};

export {Products}