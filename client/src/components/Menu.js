import {Products} from "./Product/Products";
import {CategoryBar} from "./CategoryBar";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../redux";

const Menu = () => {
    const dispatch = useDispatch();
    const {selectedType} = useSelector(state => state.typesReducer);
    const {selectedCategory} = useSelector(state => state.categoriesReducer);

    useEffect((category, type) => {
        dispatch(productsActions.getAll(selectedCategory.category, selectedType.type))
    }, [dispatch, selectedCategory, selectedType]);


    return (
        <div className="m-2">
            <CategoryBar/>
            <Products/>
        </div>
    );

}

export {Menu}