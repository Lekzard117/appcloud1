import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", clave: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("🔍 Backend response:", data);

    if (res.ok) {
      setMessage("✅ Login exitoso");
      localStorage.setItem("token", data.access);
      navigate("/home");
    } else {
      setMessage("❌ Usuario o contraseña incorrectos");
    }
  } catch (error) {
    setMessage("❌ Error de conexión con el servidor");
    console.error("🔴 Error:", error);
  }
};


  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="clave"
        placeholder="Clave"
        value={formData.clave}
        onChange={handleChange}
        required
      />

      <button type="submit">Iniciar sesión</button>
      <p>{message}</p>
    </form>
  );
}
