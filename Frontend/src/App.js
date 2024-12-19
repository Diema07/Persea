import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;  // Google OAuth token

    try {
      const response = await axios.post('http://localhost:8000/api/usuarios/auth/google/', {
        token: token
      });

      console.log('Usuario autenticado:', response.data);
    } catch (error) {
      console.error('Error al autenticar:', error.response?.data || error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </header>
    </div>
  );
}

export default App;
