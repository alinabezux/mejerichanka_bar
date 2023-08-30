import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {categoriesActions} from "../redux";
import {TypeBar} from "./TypeBar";
import {Spinner} from "react-bootstrap";

const CategoryBar = () => {
    const dispatch = useDispatch();
    const {categories, loading, error} = useSelector(state => state.categoriesReducer);
    const [showTypeBar, setShowTypeBar] = useState(false);

    useEffect(() => {
        dispatch(categoriesActions.getAll())
    }, [dispatch])

    const handleCategoryClick = (category) => {
        dispatch(categoriesActions.setSelectedCategory(category));
        if (category.category === "Головне меню") {
            setShowTypeBar(true);
        } else {
            setShowTypeBar(false);
        }

    };

    return (
        <div className="categories">
            <div>
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
                {showTypeBar && <TypeBar/>}
            </div>
        </div>

    );

}

export {CategoryBar}