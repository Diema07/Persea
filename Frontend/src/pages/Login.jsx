import '../styles/login.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


export function Login() {
  const navigate = useNavigate(); // Hook para redirección


  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await axios.post('http://localhost:8000/api/usuarios/auth/google/', {
        token: token,
      });
      navigate('/inicio-plantacion');
      console.log('Usuario autenticado:', response.data);
    } catch (error) {
      console.error('Error al autenticar:', error.response?.data || error.message);
    }
  };  

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Dividir el cuadro principal en dos */}
        <div className="login-split">
          {/* lado izquierdo*/}
          <div className="login-left">
            <img src="https://www.frutas-hortalizas.com/img/fruites_verdures/presentacio/86.jpg" alt="Decoración" className="side-image" />
          </div>
          {/* lado derecho*/}
          <div className="login-right">
            <div className="login-logo">
              <img src="logo.png" alt="Logo" className="logo-image" />
            </div>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <div className="separator">--- o ---</div>
            
            <Link to="/inicio-plantacion" className="omit-button">Omitir</Link>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
