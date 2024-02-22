'use client'

import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

// URL de la imagen
const imageUrl = 'https://via.placeholder.com/150';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, ingresa el email y la contraseña');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      // Aquí puedes redirigir al usuario a otra página o realizar alguna otra acción después del inicio de sesión exitoso
      // Por ejemplo:
      // window.location.href = '/dashboard';
    } catch (error: any) {
      setError('No se pudo hacer la petición al servidor. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-4">
          <img src={imageUrl} alt="Logo" className="w-24 h-24 rounded-full" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 pr-10 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
              <button
                type="button"
                className={`absolute inset-y-0 right-0 flex items-center px-3 bg-transparent text-blue-500`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;



