import { useEffect, useState } from 'react';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:4040/usuario/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el perfil del usuario')
        }

        const data = await response.json()
        setUser(data);
        setNewName(data.full_name) // Inicializa el campo con el nombre actual
      } catch (error) {
        console.error('Error:', error)
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateName = async () => {
    try {
      const response = await fetch('http://localhost:4040/usuario/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ full_name: newName })
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el nombre')
      }

      const updatedUser = await response.json()
      setUser(updatedUser);
      alert('Nombre actualizado con éxito')
    } catch (error) {
      console.error('Error al actualizar:', error)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const handleLogin = () => {
    window.location.href = '/login'
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        {user ? (
          <div
            className="card shadow"
            style={{
              borderRadius: "28px",
              border: "2.5px solid #c5bdb0ff",
              background: "linear-gradient(120deg, #fcfbf8ff 70%, #efeae0ff 100%)",
              padding: "2.5rem 2rem",
              maxWidth: "650px",
              margin: "auto",
              boxShadow: "0 8px 32px 0 rgba(60, 60, 90, 0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2.5rem",
                paddingBottom: "1.5rem",
                borderBottom: "1.5px solid #cfd8dc",
              }}
            >
              <img
                src={
                  user.imageUrl ||
                  "https://cdn.pixabay.com/photo/2015/07/09/19/32/dog-838281_1280.jpg"
                }
                alt="Perfil"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  border: "2.5px solid #b0bec5",
                  background: "#f5f5f5",
                  boxShadow: "0 2px 12px 0 rgba(120,120,140,0.08)",
                }}
              />
              <div style={{ textAlign: "left", flex: 1 }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.45rem",
                    color: "#607d8b",
                    marginBottom: "0.5rem",
                    letterSpacing: "1px",
                  }}
                >
                  Usuario: <span style={{ color: "#333" }}>{user.username}</span>
                </div>
                <div
                  style={{
                    fontSize: "1.15rem",
                    color: "#78909c",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  Nombre completo:
                  <span style={{ color: "#333", marginLeft: "0.5rem" }}>
                    {user.full_name}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <input
                type="text"
                className="form-control mb-2"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nuevo nombre"
                style={{
                  borderRadius: "10px",
                  border: "1.5px solid #b0bec5",
                  marginBottom: "1rem",
                  background: "#f5f7fa",
                  fontSize: "1.05rem",
                  color: "#607d8b",
                  padding: "0.7rem 1rem",
                }}
              />
              <button
                className="btn btn-primary"
                onClick={handleUpdateName}
                style={{
                  borderRadius: "10px",
                  marginRight: "0.7rem",
                  fontWeight: "bold",
                  background: "#b3c2d6",
                  color: "#37474f",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  boxShadow: "0 2px 8px 0 rgba(120,120,140,0.08)",
                }}
              >
                ✏️ Actualizar Nombre
              </button>
              <button
                className="btn btn-secondary mt-2"
                onClick={handleLogout}
                style={{
                  borderRadius: "10px",
                  fontWeight: "bold",
                  background: "#eceff1",
                  color: "#607d8b",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  marginLeft: "0.2rem",
                }}
              >
                Cerrar sesión
              </button>
            </div>
            <div
              style={{
                marginTop: "2.5rem",
                fontSize: "1rem",
                color: "#b0bec5",
                textAlign: "center",
                letterSpacing: "2px",
                fontWeight: "bold",
                background: "#f5f7fa",
                borderRadius: "12px",
                padding: "0.7rem 0",
                boxShadow: "0 1px 4px 0 rgba(120,120,140,0.06)",
              }}
            >
              <span>Identificación digital de usuario</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>No has iniciado sesión.</p>
            <button className="btn btn-primary" onClick={handleLogin}>
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Perfil;

