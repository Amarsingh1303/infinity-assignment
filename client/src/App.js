import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee";
import Customer from "./components/Customer";
import Admin from "./components/Admin";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import AppNavbar from "./components/AppNavbar";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
        {/* <Route path="/:id/detail" element={<Detail />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
