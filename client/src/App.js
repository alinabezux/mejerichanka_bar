import 'bootstrap/dist/css/bootstrap.min.css';
import './styles'

import {Route, Routes, useLocation} from "react-router-dom";
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";
import {AboutUsPage, AdminPage, HomePage, NovunkuPage, RegisterPage, OrderPage, LogInPage} from "./pages";
import {NaviBar} from "./components";
import {history} from "./services";


function RenderNaviBar() {
    const location = useLocation();
    if (location.pathname.includes('/admin') || location.pathname.includes('/logIn') || location.pathname.includes('/registration') || location.pathname.includes('/order')) {
        return null;
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
                <Route path={'/news'} element={<NovunkuPage/>}/>
                <Route path={'/logIn'} element={<LogInPage/>}/>
                <Route path={'/registration'} element={<RegisterPage/>}/>
                <Route path={'/admin'} element={<AdminPage/>}/>
                <Route path={'/order'} element={<OrderPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;