import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage/register";
import LoginPages from "./LoginPage";
import DashBoard from "./Dashboard/dashboard";

import { PrimeReactProvider } from 'primereact/api';
import AddCategory from "./Subcategory/addcategory";


function App() {
  return (
    <PrimeReactProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPages/>} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/addCategory" element={<AddCategory/>}/>
      </Routes>
    </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
