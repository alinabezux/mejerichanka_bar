import {Menu, Slider} from "../components";
import {Outlet} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <Slider/>
            <Menu/>
            <Outlet/>
        </div>
    )
}

export {HomePage}