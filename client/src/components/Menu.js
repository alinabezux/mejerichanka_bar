import {Products} from "./Product/Products";
import {CategoryBar} from "./CategoryBar";

const Menu = () => {

    return (
        <div className="m-2">
            <CategoryBar/>
            <Products/>
        </div>
    );

}

export {Menu}