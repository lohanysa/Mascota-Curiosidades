import { useEffect, useState } from 'react';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:4040/usuario/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el perfil del usuario');
        }

        const data = await response.json();
        setUser(data);
        setNewName(data.nombre); // Inicializa el campo con el nombre actual
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateName = async () => {
    try {
      const response = await fetch('http://localhost:4040/usuario/update-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ nombre: newName })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el nombre');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      alert('Nombre actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        {user && (
          <div className="card text-center">
            <img
              src={user.imageUrl || 'https://via.placeholder.com/250'}
              alt="Perfil"
              className="card-img-top"
              style={{ height: '250px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">Nombre actual: {user.nombre}</h5>
              <input
                type="text"
                className="form-control mb-2"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nuevo nombre"
              />
              <button className="btn btn-primary" onClick={handleUpdateName}>
                ✏️ Actualizar Nombre
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;

