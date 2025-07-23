import { useEffect, useState } from "react";

export default function HomePage() {
  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8000/api/actividades/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setActividades(data))
      .catch((err) => {
        console.error("Error al cargar actividades:", err);
        setMessage("⚠️ No se pudieron cargar las actividades.");
      });
  }, []);

  const handleAddActividad = async () => {
    if (!nuevaActividad.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/api/actividades/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo: nuevaActividad }),
      });

      if (res.ok) {
        const nueva = await res.json();
        setActividades([...actividades, nueva]);
        setNuevaActividad("");
        setMessage("✅ Actividad añadida");
      } else {
        setMessage("❌ No se pudo añadir la actividad");
      }
    } catch (error) {
      setMessage("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div className="homepage">
      <h2>Mis Actividades</h2>
      <ul>
        {actividades.map((act) => (
          <li key={act.id}>{act.titulo}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Nueva actividad"
        value={nuevaActividad}
        onChange={(e) => setNuevaActividad(e.target.value)}
      />
      <button onClick={handleAddActividad}>Agregar</button>
      <p>{message}</p>
    </div>
  );
}
