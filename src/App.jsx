import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from './context/AuthProvider'
import LandingPage from "./pages/public/LandingPage"
import PublicApp from './pages/public/PublicApp'
import Login from "./pages/public/Login"
import Dashboard from "./pages/private/Dashboard"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<LandingPage/>}/>
            <Route path="/ideas" element={<PublicApp/>} />
            <Route path="/login/mod" element={<Login/>} />
            <Route path="/home" element={<Dashboard/>} />
            <Route path="*" element={<h1>No encontrado</h1>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
