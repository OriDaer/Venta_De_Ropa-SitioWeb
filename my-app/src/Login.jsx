import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = (e) => {
    e.preventDefault();
    console.log({ email, nombre, fechaNacimiento });

    setMensaje('¡Gracias por suscribirte!');

    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  return (
    <div id="login">
      <form onSubmit={manejarSubmit}>
        <div id="loginOmitir">
          <p>X</p>
        </div>
        <h1>DOMSAR</h1>
        <div>
          <label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              value={nombre}
              placeholder="Nombre"
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">SUSCRIBIRSE</button>
      </form>

      {mensaje && (
        <div className="mensaje-agradecimiento">
          <p>{mensaje}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
