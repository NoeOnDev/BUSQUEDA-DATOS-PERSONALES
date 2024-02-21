import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../assets/css/authStyle.module.css";

function LoginUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("")
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 15) {
      return "La contraseña debe tener entre 8 y 15 caracteres";
    }
    if (!/[A-Z]/.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!/[a-z]/.test(password)) {
      return "La contraseña debe contener al menos una letra minúscula";
    }
    if (!/[0-9]/.test(password)) {
      return "La contraseña debe contener al menos un dígito";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "La contraseña debe contener al menos un caracter especial: !@#$%^&*";
    }
    if (/\s/.test(password)) {
      return "La contraseña no debe contener espacios en blanco";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (email === "") {
      setEmailError("El campo de correo electrónico no puede estar vacío");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Por favor, introduce un correo electrónico válido");
      setIsLoading(false);
      return;
    }

    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage !== "") {
      setPasswordError(passwordValidationMessage);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        setGeneralError(data.message || "Error al registrarse. Intente de nuevo.");
      } else {
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      setGeneralError("Error al conectarse al servidor. Por favor, intente más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return(
    <div className={styles.contaier}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <span className={styles.title}>Login</span>
      <label className={styles.label}>Email</label>
      <input 
      className={styles.input}
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      {emailError && <p>{emailError}</p>}
      <label className={styles.label}>Password</label>
      <input 
      className={styles.input}
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      {passwordError && <p>{passwordError}</p>}
      {generalError && <p>{generalError}</p>}
      <Link to="/register">Registro</Link>
      <button type="submit" disabled={isLoading}>Register</button>
    </form>
    </div>
  );
}

export default LoginUserForm;