import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {AboutUsPage, AdminPage, HomePage, HookahPage} from "./pages";
import {NaviBar} from "./components";

// Компонент, який відповідає за виведення NaviBar, окрім /admin
function RenderNaviBar() {
    const location = useLocation();
    const isAdminPage = location.pathname.includes('/admin');

    if (isAdminPage) {
        return null; // Повертаємо null, щоб NaviBar не відображався на /admin
    }

    return <NaviBar/>;
}

function App() {
    return (
        <BrowserRouter>
            {/* Виводить компонент NaviBar на всіх сторінках, окрім /admin */}
            <RenderNaviBar/>

            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/about'} element={<AboutUsPage/>}/>
                <Route path={'/hookah'} element={<HookahPage/>}/>
                <Route path={'/admin'} element={<AdminPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;