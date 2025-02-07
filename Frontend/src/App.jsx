import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { NombrePlantacion } from './components/plantacion-inicio';
import {Taskform} from './pages/plantacion';

function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Navigate to ="/Login"/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/inicio-plantacion' element={<NombrePlantacion/>} />
          <Route path="/plantacion" element={<Taskform />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
  