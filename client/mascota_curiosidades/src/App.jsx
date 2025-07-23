
import Init from "./pages/init.jsx"
import {Routes, Route} from "react-router-dom"
import LoginPage from "./pages/Login.jsx"
import RegisterPage from "./pages/registro.jsx"
import HomePage from "./pages/Home.jsx"
import GaleriaPage from "./pages/galeria.jsx"
function App() {


  return (

    <Routes>
      {/*recive dos parametros el path y el elemento(que es la pagina a la que se dirigira)*/}
        <Route path="/" element={<Init />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/galeria" element={<GaleriaPage />} />
    </Routes>

  )
}

export default App
