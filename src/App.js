
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Account from "./pages/CreateAccount/Account";
import Home from "./pages/Home/Home";
import PagesDetails from "./pages/PegesDetails/PagesDetails";
import AboutUser from "./pages/AboutUser/AboutUser";
import UserProfile from "./pages/UserProfile/UserProfile";
import ViewPage from "./pages/ViewPage/ViewPage";



function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          
            <Route path="/" element={<Login />} />
            <Route path="/create-new-account" element={<Account />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/user-profile" element={<UserProfile/>} />
            <Route path="/pages" element={<PagesDetails/>} />
            <Route path="//pages/view-page" element={<ViewPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
