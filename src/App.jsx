import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Users from "./pages/UsersPage";
import { UserDataProvider } from "./context/UserDataContext";
import ServicePage from "./pages/ServicePage";
import CreateService from "./pages/CreateService";


function App() {

  return (
    <UserDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<Users />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="/createservice" element={<CreateService />} />
        </Routes>
      </BrowserRouter>
    </UserDataProvider>
  )
}

export default App
