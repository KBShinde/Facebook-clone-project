import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Account from "./pages/CreateAccount/Account";
import Home from "./pages/Home/Home";
import PagesDetails from "./pages/PegesDetails/PagesDetails";
import AboutUser from "./pages/AboutUser/AboutUser";
import UserProfile from "./pages/UserProfile/UserProfile";
import ViewPage from "./pages/ViewPage/ViewPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import { createContext, useState } from "react";

export const ThemeContext = createContext();


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = JSON.parse(localStorage.getItem('dark'));
    return savedTheme !== null ? savedTheme : false;
  });

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem('dark', JSON.stringify(newTheme));
      return newTheme;
    });
  };
  const handleMenuClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  
  };
  

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme, isMenuOpen, handleMenuClick }}>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-new-account" element={<Account />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/pages" element={<PagesDetails />} />
            <Route path="/pages/view-page" element={<ViewPage />} /> 
            <Route path="/pages/create-page" element={<CreatePage />} /> 
            <Route path="/about-user" element={<AboutUser />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
