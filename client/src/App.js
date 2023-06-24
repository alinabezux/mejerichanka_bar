import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {HomePage, Menu, Reserve} from "./pages";
import {NaviBar} from "./components/NaviBar";

function App() {
    return (
        <BrowserRouter>
            <NaviBar/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/menu'} element={<Menu/>}/>
                <Route path={'/reserve'} element={<Reserve/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;