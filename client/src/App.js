import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "./components/Employee/Employee";
import Customer from "./components/Customer/Customer";
import Admin from "./components/Admin/Admin";
import Login from "./components/Shared/Login";
import AppNavbar from "./components/Shared/AppNavbar";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;
