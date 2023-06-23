import {Routes, Route, BrowserRouter} from "react-router-dom";
import {MainLayout, Menu, Reserve} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}/>
                <Route path={'/menu'} element={<Menu/>}/>
                <Route path={'/reserve'} element={<Reserve/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;