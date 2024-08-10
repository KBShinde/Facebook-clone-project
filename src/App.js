
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Account from "./pages/CreateAccount/Account";
import Home from "./pages/Home/Home";


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          
            <Route path="/" element={<Login />} />
            <Route path="/create-new-account" element={<Account />} />
            <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
