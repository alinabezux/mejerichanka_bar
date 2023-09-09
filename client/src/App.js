import 'bootstrap/dist/css/bootstrap.min.css';
import './styles'

import {Route, Routes, useLocation} from "react-router-dom";
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {AboutUsPage, AdminPage, HomePage, HookahPage, AuthPage, OrderPage} from "./pages";
import {NaviBar} from "./components";
import {history} from "./services";


// Компонент, який відповідає за виведення NaviBar
function RenderNaviBar() {
    const location = useLocation();
    if (location.pathname.includes('/admin') || location.pathname.includes('/logIn') || location.pathname.includes('/registration') || location.pathname.includes('/order')) {
        return null; // Повертаємо null, щоб NaviBar не відображався на /admin
    }
    return <NaviBar/>;
}


function App() {
    return (
        <BrowserRouter history={history}>
            <RenderNaviBar/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/about'} element={<AboutUsPage/>}/>
                <Route path={'/hookah'} element={<HookahPage/>}/>
                <Route path={'/logIn'} element={<AuthPage/>}/>
                <Route path={'/registration'} element={<AuthPage/>}/>
                <Route path={'/admin'} element={<AdminPage/>}/>
                <Route path={'/order'} element={<OrderPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;