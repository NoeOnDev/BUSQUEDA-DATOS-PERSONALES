import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState(""); // Estado para errores generales
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
      const response = await fetch('http://localhost:3000/register', {
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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      {emailError && <p>{emailError}</p>}
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      {passwordError && <p>{passwordError}</p>}
      {generalError && <p>{generalError}</p>}
      <button type="submit" disabled={isLoading}>Register</button>
    </form>
  );
}

export default RegisterUserForm;