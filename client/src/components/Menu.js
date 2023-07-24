import {Products} from "./Product/Products";
import {CategoryBar} from "./CategoryBar";

const Menu = () => {
    return (
        <div className="menu">
            <div className="title" id="menu">Меню</div>
            <CategoryBar/>
            <Products/>
        </div>
    );

}

export {Menu}