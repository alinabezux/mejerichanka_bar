import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";

import {categoriesActions, typesActions} from "../redux";
import {TypeBar} from "./TypeBar";

const CategoryBar = () => {
    const dispatch = useDispatch();
    const {categories, loading, error} = useSelector(state => state.categoriesReducer);
    const {types} = useSelector(state => state.typesReducer);
    const [showTypeBar, setShowTypeBar] = useState(false);
    const [selCat, setSelCat] = useState('');

    useEffect(() => {
        dispatch(categoriesActions.getAll({isGettingAll: true}))
    }, [dispatch])

    useEffect(() => {
        dispatch(typesActions.getTypesByCategoryId({categoryId: selCat}))
    }, [dispatch, selCat])

    const handleCategoryClick = useCallback((category) => {
        dispatch(categoriesActions.setSelectedCategory(category));
        setSelCat(category._id);
        const scroll = document.getElementById("scrollTo");
        if (scroll) {
            scroll.scrollIntoView({behavior: "smooth"});
        }
    }, [dispatch]);

    useEffect(() => {
        if (types.length > 0) {
            setShowTypeBar(true);
        } else {
            setShowTypeBar(false);
        }
    }, [types]);

    useEffect(() => {
        if (selCat) {
            dispatch(typesActions.getTypesByCategoryId({categoryId: selCat}));
        }
    }, [dispatch, selCat]);


    return (
        <>
            <div className="categories">
                {categories.map(category => (
                    <img
                        className="m-3"
                        key={category._id}
                        src={category.image}
                        alt={category.category}
                        onClick={() => handleCategoryClick(category)}/>
                ))}
            </div>
            {loading && <Spinner/>}
            {error && <h1>Error:(</h1>}
            <div>
                {showTypeBar && <TypeBar types={types}/>}
            </div>
        </>

    );

}

export {CategoryBar}