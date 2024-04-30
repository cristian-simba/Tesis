import { BrowserRouter, Routes, Route } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import PublicApp from './pages/public/PublicApp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>}/>

          <Route path="/ideas" element={<PublicApp/>} />

          <Route path="*" element={<h1>No encontrado</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
