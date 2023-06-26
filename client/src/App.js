import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AboutUsPage, HomePage, HookahPage, Menu, ReservePage} from "./pages";
import {NaviBar} from "./components/NaviBar";

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