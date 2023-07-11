import {useEffect, useState} from "react";

import {Products} from "./Product/Products";
import {categoriesService} from "../services/categories.service";
import {typesService} from "../services/types.service";

const Menu = () => {

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        categoriesService.getAll().then(({data}) => setCategories(data))
        typesService.getAll().then(({data}) => setTypes(data))

    }, []);

    return (
        <div className="m-2">
            {/*{*/}
            {/*    categories.map((category) => (*/}
            {/*        <div key={category.id}>*/}
            {/*            <h2 id={category.category}>{category.category}</h2>*/}
            {/*            {category.types && category.types.length > 0 ? (*/}
            {/*                types.map((type) => (*/}
            {/*                    <div key={type.id}>*/}
            {/*                        <h3>{type.type}</h3>*/}
            {/*                        /!*<Products category={category.category} type={type.type}/>*!/*/}
            {/*                    </div>*/}
            {/*                ))*/}
            {/*            ) : (*/}
            {/*                <Products category={category.category}/>*/}
            {/*            )*/}
            {/*            }*/}
            {/*        </div>))*/}
            {/*}*/}
            menu
        </div>
    );

}

export {Menu}