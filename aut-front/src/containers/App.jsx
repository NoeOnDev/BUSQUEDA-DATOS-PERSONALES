import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "../pages/LoginUser";
import RegisterUser from "../pages/RegisterUser";
import MenuSearch from "../pages/MenuSearch";
import Search from "../pages/Search";
import SearchEmail from "../pages/SearchEmail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/home" element={<MenuSearch />} />
                <Route path="/search-name" element={<Search />} />
                <Route path="/search-email" element={<SearchEmail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;