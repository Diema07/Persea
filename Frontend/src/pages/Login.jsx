// src/pages/Login.jsx
import '../styles/login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Login() {
  const navigate = useNavigate();

  // 1. Obtener CSRF Token
  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/usuarios/get-csrf-token/', 
        { withCredentials: true }
      );
      axios.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
    } catch (error) {
      console.error('Error CSRF:', error);
    }
  };

  // 2. Obtener Token de autenticación después de Google Login
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/usuarios/get_user_token/',
        { withCredentials: true }
      );
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/inicio-plantacion');
      }
    } catch (error) {
      console.log('Usuario no autenticado');
    }
  };

  useEffect(() => {
    fetchCsrfToken();
    checkAuthStatus();
  }, []);

  // 3. Login con Google
  const handleGoogleLogin = () => {
    window.location.href = 
      'http://localhost:8000/accounts/google/login/?process=login&redirect_uri=http://localhost:3000/inicio-plantacion';
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-split">
          <div className="login-left">
            <img src="https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/86.jpg" 
                 alt="Decoración" 
                 className="side-image" />
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