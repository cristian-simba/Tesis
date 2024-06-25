import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './context/AuthProvider';
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingPage from "./pages/public/LandingPage";
import PublicApp from './pages/public/PublicApp';
import ConfirmarCuenta from "./pages/public/ConfirmarCuenta";
import Login from "./pages/public/Login";
import FirstLogin from "./pages/public/FirstLogin";
import ForgotPassword from "./pages/public/ForgotPassword";
import VerifyToken from "./pages/public/VerifyToken";
import NewPassword from "./pages/public/NewPassword";
import UpdatePassword from "./pages/private/Moderators/UpdatePassword";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext"
import Dashboard from "./pages/private/Dashboard";
import Moderadores from "./pages/private/Moderators/Moderadores";
import Usuarios from "./pages/private/Users/Usuarios";
import Reportes from "./pages/private/Reports/Reportes";
import Reporte from "./pages/private/Reports/Reporte";
import Graficas from "./pages/private/Graphics/Graficas";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/ideas" element={<PublicApp />} />
          <Route path="/confirmar/:token" element={<ConfirmarCuenta/>}/>
          <Route path="/mod/login" element={<Login />} />
          <Route path="/cambiar-contraseña" element={<FirstLogin />} />
          <Route path="/recuperar-password" element={<ForgotPassword />} />
          <Route path="/moderador/recuperar/:token" element={<VerifyToken />} />
          <Route path="/nueva-contraseña/:token" element={<NewPassword />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <ThemeProvider>
                  <ToastProvider>
                    <Dashboard />
                  </ToastProvider>
                </ThemeProvider>
              }
            >
              <Route path="dashboard" element={<Graficas/>} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="actualizar-contraseña/:id" element={<UpdatePassword />} />
              <Route path="reportes" element={<Reportes/>} />
              <Route path="reporte/:id" element={<Reporte />} />

              <Route
                path="moderadores"
                element={
                  <ProtectedRoute>
                    <Moderadores />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<h1>No encontrado</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
