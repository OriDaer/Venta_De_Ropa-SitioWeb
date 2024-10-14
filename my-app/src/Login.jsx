import React, { useState } from 'react';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    console.log({ email, nombre, fechaNacimiento });
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div>
        <h1>DOMSAR</h1>
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
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Login;
