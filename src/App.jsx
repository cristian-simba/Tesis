import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from './context/AuthProvider'
import PrivateRoute from "./routes/PrivateRoute"
import ProtectedRoute from "./routes/ProtectedRoute"
import LandingPage from "./pages/public/LandingPage"
import PublicApp from './pages/public/PublicApp'
import Login from "./pages/public/Login"
import ResetPassword from "./pages/public/ResetPassword"
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
            <Route path="/mod/reset-password" element={<ResetPassword/>} />
            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Dashboard/>} >
                <Route path="dashboard" element={<h1>Todos los Moderadores</h1>}/>

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
