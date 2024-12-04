import React, { useEffect, useState } from 'react';
import appFirebase from '../credenciales';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';

const auth = getAuth(appFirebase);

const Home = ({ correoUsuario }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [editAlumno, setEditAlumno] = useState(null);
  const [newData, setNewData] = useState({ nombre: '', email: '' });

  // Función para obtener la lista de alumnos
  const fetchAlumnos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/alumnos');
      setAlumnos(response.data);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
      alert('Hubo un problema al cargar la lista de alumnos.');
    }
  };

  // Eliminar alumno
  const deleteAlumno = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/auth/alumnos/${id}`);
      setAlumnos(alumnos.filter((alumno) => alumno.id !== id));
      alert('Alumno eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar alumno:', error);
      alert('No se pudo eliminar el alumno.');
    }
  };

  // Editar alumno
  const saveAlumno = async () => {
    if (!editAlumno || !editAlumno.id) {
      console.error("El id del alumno no está definido");
      return;
    }
  
    const id = editAlumno.id; // Asegúrate de obtener el id de editAlumno
  
    try {
      await axios.put(
        `http://localhost:3000/api/auth/alumnos/${id}`, 
        newData, 
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      setAlumnos(
        alumnos.map((alumno) =>
          alumno.id === editAlumno.id ? { ...alumno, ...newData } : alumno
        )
      );
  
      alert('Alumno actualizado exitosamente.');
      setEditAlumno(null);
    } catch (error) {
      console.error('Error al editar alumno:', error);
      alert('No se pudo actualizar el alumno.');
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert('Sesión cerrada correctamente'))
      .catch((error) => console.error('Error al cerrar sesión:', error));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bienvenido {correoUsuario}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Lista de Alumnos</h2>
        {alumnos.length > 0 ? (
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.id}>
                  <td className="border px-4 py-2">{alumno.nombre}</td>
                  <td className="border px-4 py-2">{alumno.email}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => setEditAlumno(alumno)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteAlumno(alumno.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No hay alumnos registrados.</p>
        )}
      </div>

      {editAlumno && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Editar Alumno</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={newData.nombre}
              onChange={(e) => setNewData({ ...newData, nombre: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="email"
              placeholder="Email"
              value={newData.email}
              onChange={(e) => setNewData({ ...newData, email: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={saveAlumno}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditAlumno(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
