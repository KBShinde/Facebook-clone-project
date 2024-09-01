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
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
    console.log("darkk");
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-new-account" element={<Account />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/pages" element={<PagesDetails />} />
            <Route path="/pages/view-page" element={<ViewPage />} /> {/* Corrected path */}
            <Route path="/pages/create-page" element={<CreatePage />} /> {/* Corrected path */}
            <Route path="/about-user" element={<AboutUser />} /> {/* Added route */}
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
