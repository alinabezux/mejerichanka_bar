import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AboutUsPage, HomePage, HookahPage, ReservePage} from "./pages";
import {Menu, NaviBar} from "./components";

function App() {
    return (
        <BrowserRouter>
            <NaviBar/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/about'} element={<AboutUsPage/>}/>
                <Route path={'/menu'} element={<Menu/>}/>
                <Route path={'/reserve'} element={<ReservePage/>}/>
                <Route path={'/hookah'} element={<HookahPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;