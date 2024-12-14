import './App.css';
import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';
import { useEffect } from 'react';

function App() {
  const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Usamos la variable de entorno

  // Inicializar la API de Google en el efecto useEffect
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, [clientID]);

  // Función que se llama cuando el inicio de sesión es exitoso
  const onSuccess = (response) => {
    console.log('Datos de la respuesta:', response);

    const userData = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      googleId: response.googleId,
    };

    // Enviar los datos al backend para autenticación
    fetch('http://localhost:8000/api/usuarios/auth/google/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),  // Convertir a JSON
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Respuesta del backend:', data);
      })
      .catch((error) => {
        console.error('Error al enviar datos al backend:', error);
      });
  };

  // Función que se llama cuando el inicio de sesión falla
  const onFailure = () => {
    console.log("Error en el login");
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <div className="btn">
        {/* Botón de Google Login */}
        <GoogleLogin
          clientId={clientID}  // Utiliza el clientId de la variable de entorno
          onSuccess={onSuccess}  // Callback para cuando el login es exitoso
          onFailure={onFailure}  // Callback para cuando el login falla
          cookiePolicy={"single_host_origin"}  // Política de cookies
        />
      </div>
    </div>
  );
}

export default App;
