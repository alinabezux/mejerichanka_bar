import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {categoriesActions} from "../redux";
import {TypeBar} from "./TypeBar";

const CategoryBar = () => {
    const dispatch = useDispatch();
    const {categories, selectedCategory} = useSelector(state => state.categoriesReducer);
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
        <div>
            <div className="m-4 d-flex flex-wrap justify-content-evenly">
                {categories.map(category => (
                    <Button
                        variant={selectedCategory === category ? "dark" : "outline-dark"}
                        size="lg"
                        key={category.id}
                        onClick={() => handleCategoryClick(category)}

                    >
                        {category.category}
                    </Button>
                ))}
            </div>
            <div className="d-flex justify-content-evenly">
                {showTypeBar && <TypeBar/>}
            </div>
        </div>

    );

}

export {CategoryBar}