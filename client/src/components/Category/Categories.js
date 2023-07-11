import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {categoriesActions} from "../../redux";
import {categoriesService} from "../../services";
import {Category} from "./Category";

const Categories = () => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.categoriesReducer);

    useEffect(() => {
        categoriesService.getAll().then(({data}) => dispatch(categoriesActions.getAll(data)))
    }, [])


    return (
        <div className="m-5 d-flex flex-wrap justify-content-evenly ">
            {
                categories.map(category => <Category key={category.id} category={category}/>)
            }
        </div>
    );
}

export {Categories}