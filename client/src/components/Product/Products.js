import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";

import {Product} from "./Product";
import {productsActions} from "../../redux";
import Pagination from "react-bootstrap/Pagination";
import generatePagination from "../Pagination";

const Products = () => {
    const dispatch = useDispatch();

    const {products, totalPagesProducts, currentPageProducts, error} = useSelector(state => state.productsReducer);
    const {selectedCategory} = useSelector(state => state.categoriesReducer);
    const {selectedType} = useSelector(state => state.typesReducer);


    useEffect(() => {
        if (currentPageProducts > totalPagesProducts) {
            dispatch(productsActions.setCurrentPageProducts(1));
        }
    }, [dispatch, currentPageProducts,totalPagesProducts]);

    useEffect(() => {
        dispatch(productsActions.getAll({
            category: selectedCategory.category,
            type: selectedType.type,
            page: currentPageProducts,
            isGettingAll: false
        }))
    }, [dispatch, selectedCategory.category, selectedType.type, currentPageProducts]);


    const handleSetCurrentPageProducts = async (pageNumber) => {
        dispatch(productsActions.setCurrentPageProducts(pageNumber));
    }

    const paginationItemsProducts = generatePagination(totalPagesProducts, currentPageProducts, handleSetCurrentPageProducts);

    return (
        <>
            <Container className="products m-3" id="scrollTo">
                {
                    products.map(product =>
                        <Product key={product._id} product={product}/>)
                }
                {error && <h1>Error:(</h1>}
            </Container>
            <Pagination style={{display: "flex", justifyContent: "center"}}>{paginationItemsProducts}</Pagination>
        </>
    );
};

export {Products}
