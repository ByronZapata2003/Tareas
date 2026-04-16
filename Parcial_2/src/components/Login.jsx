import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login({ setUser }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, correo, password);
      setUser(res.user.email);
    } catch (error) {
      alert("Error en login");
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>
      <input placeholder="Correo" onChange={e => setCorreo(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Ingresar</button>
    </div>
  );
}

export default Login;