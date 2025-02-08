import '../styles/login.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'; // Importar axios
import { useNavigate, Link } from 'react-router-dom'; // Importar Link
import Cookies from 'js-cookie'; // Importar js-cookie
import { useEffect } from 'react'; // Importar useEffect

export function Login() {
  const navigate = useNavigate();

  // Función para obtener el token CSRF
  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/usuarios/get-csrf-token/', {
        withCredentials: true, // Permitir el envío de cookies
      });
      console.log('Token CSRF obtenido:', response.data.csrfToken);
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
    }
  };

  // Obtener el token CSRF cuando el componente se monta
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleGoogleLogin = () => {
    // Redirigir al usuario a la URL de inicio de sesión de Google proporcionada por allauth
    window.location.href = 'http://localhost:8000/accounts/google/login/';
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-split">
          <div className="login-left">
            <img src="https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/86.jpg" alt="Decoración" className="side-image" />
          </div>
          <div className="login-right">
            <div className="login-logo">
              <img src="logo.png" alt="Logo" className="logo-image" />
            </div>
            <button onClick={handleGoogleLogin} className="google-login-button">
              Iniciar sesión con Google
            </button>
            <div className="separator">--- o ---</div>
            <Link to="/inicio-plantacion" className="omit-button">Omitir</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;