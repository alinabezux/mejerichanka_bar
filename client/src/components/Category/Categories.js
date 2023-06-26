import {useEffect, useState} from "react";

import {categoriesService} from "../../services/categories.service";
import {Category} from "./Category";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoriesService.getAll().then(({data}) => setCategories(data))
    }, [])


    return (
        <div>
            {
                categories.map(category => <Category key={category.id} category={category}/>)
            }
        </div>
    );
}

export {Categories}