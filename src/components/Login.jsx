import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaLock, FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Importación de íconos
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);

  const functionAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    if (registrando) {
      try {
        await createUserWithEmailAndPassword(auth, correo, contraseña);
        alert('Usuario registrado exitosamente.');
      } catch (error) {
        alert('Asegúrate de que la contraseña tenga al menos 8 caracteres.');
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contraseña);
        alert('Inicio de sesión exitoso.');
      } catch (error) {
        alert('El correo o la contraseña son incorrectos.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white px-8 py-12 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-6xl text-blue-500 mb-4 shadow-lg" />
          <h2 className="text-2xl font-semibold text-gray-700">
            {registrando ? 'Crea tu cuenta' : 'Bienvenido de nuevo'}
          </h2>
        </div>
        <form
          onSubmit={functionAutenticacion}
          className="w-full space-y-4"
        >
          <div className="flex items-center bg-gray-100 rounded-lg shadow-sm">
            <FaEnvelope className="text-gray-500 ml-3" />
            <input
              type="email"
              id="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg shadow-sm">
            <FaLock className="text-gray-500 ml-3" />
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            {registrando ? 'Registrarte' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="mt-4 text-gray-500 text-center">
          {registrando ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
          <button
            onClick={() => setRegistrando(!registrando)}
            className="ml-2 flex items-center text-blue-500 font-semibold hover:underline"
          >
            {registrando ? (
              <>
                <FaArrowLeft className="mr-1" /> Inicia sesión
              </>
            ) : (
              <>
                <FaArrowRight className="mr-1" /> Regístrate
              </>
            )}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
