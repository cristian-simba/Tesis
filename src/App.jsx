import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from './context/AuthProvider'
import PrivateRoute from "./routes/PrivateRoute"
import LandingPage from "./pages/public/LandingPage"
import PublicApp from './pages/public/PublicApp'
import Login from "./pages/public/Login"
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
            <Route element={<PrivateRoute/>}>
              <Route path="/dashboard/" element={<Dashboard/>} >
                <Route path="moderadores" element={<Moderadores/>}/>
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
