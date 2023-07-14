import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {categoriesActions} from "../redux";

const CategoryBar = () => {
    const dispatch = useDispatch();
    const {categories, selectedCategory} = useSelector(state => state.categoriesReducer);

    useEffect(() => {
        dispatch(categoriesActions.getAll())
    }, [dispatch])

    return (
        <div className="m-5 d-flex flex-wrap justify-content-evenly ">
            {
                categories.map(category =>
                    <Button variant="outline-dark" size="lg"
                            key={category.id}
                            onClick={() => dispatch(categoriesActions.setSelectedCategory(category))}
                    >
                        {category.category}
                    </Button>)
            }
        </div>
    );
}

export {CategoryBar}