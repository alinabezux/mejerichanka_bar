import {Products} from "./Product/Products";
import {CategoryBar} from "./CategoryBar";

const Menu = () => {
    return (
        <div className="menu" >
            <h1 className="title" id="menu">Меню</h1>
            <CategoryBar/>
            <Products/>
        </div>
    );

}

export {Menu}