import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import { Login } from './pages/Login';
import { PlantacionInicio } from './components/plantacion-inicio';
import { Taskform } from './pages/plantacion';
import { InicioPlantacion } from "./pages/inicio-plantacion";
import { PlantacionDetalle } from './pages/plantacionDetalle';
import { PreparacionTerrenoPage } from './pages/preparacionTerreno';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/Login" />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/inicio-plantacion' element={<PlantacionInicio />} />
        <Route path="/plantacion" element={<Taskform />} />
        <Route path="/plantacion/inicio" element={<InicioPlantacion />} />
        <Route path="/plantacion/:idPlantacion" element={<PlantacionDetalle />} />
        <Route path="/preparacion/:id" element={<PreparacionTerrenoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;