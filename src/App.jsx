import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from './context/AuthProvider'
import PrivateRoute from "./routes/PrivateRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import LandingPage from "./pages/public/LandingPage"
import PublicApp from './pages/public/PublicApp'
import Login from "./pages/public/Login"
import FirstLogin from "./pages/public/FirstLogin"
import ForgotPassword from "./pages/public/ForgotPassword"
import VerifyToken from "./pages/public/VerifyToken"
import NewPassword from "./pages/public/NewPassword"
import UpdatePassword from "./pages/private/UpdatePassword"
import Dashboard from "./pages/private/Dashboard"
import Moderadores from "./pages/private/Moderadores"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<LandingPage/>}/>
            <Route path="/ideas" element={<PublicApp/>} />
            <Route path="/mod/login" element={<Login/>} />
            <Route path="/cambiar-contraseña" element={<FirstLogin/>} />
            <Route path="/recuperar-password" element={<ForgotPassword/>} />
            <Route path="/recuperar-password/:token" element={<VerifyToken/>} />
            <Route path="/nueva-contraseña/:token" element={<NewPassword/>} />
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Dashboard/>} >
                <Route path="dashboard" element={<h1>Todos los Moderadores</h1>}/>
                <Route path="/actualizar-contraseña/:id" element={<UpdatePassword/>} />

                <Route path="moderadores" element={
                  <ProtectedRoute> 
                    <Moderadores/>
                  </ProtectedRoute>
                }/>

                
              </Route>
            </Route>
            <Route path="*" element={<h1>No encontrado</h1>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
