import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Menu } from "./pages/Menu"
import { LoginUser } from "./pages/LoginUser"
import { Home } from "./pages/Home"
import { RegisterUser } from "./pages/RegisterUser"
import { useAuth } from "./store/auth"
import { Cart } from "./pages/Cart"
import { LoginAdmin } from "./pages/LoginAdmin"
import { AdminPanel } from "./pages/AdminPanel"

export const Router = () => {

  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/menu" element={
          isAuthenticated ? <Menu /> : <LoginUser />
        } />
        <Route path="/cart" element={
          isAuthenticated ? <Cart /> : <LoginUser />
        } />


        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/panel" element={
          <AdminPanel />
        } />


        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  )

}