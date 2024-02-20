import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/authStyle.module.css';

function LoginUserForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            toast.success('Inicio de sesión exitoso');
            setTimeout(() => { navigate('/home'); }, 1500);
        } else {
            toast.error(data.message);
        }
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <input type="email"  placeholder="ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={styles.inputContainer}>
                    <input type="password" placeholder="ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className={styles.submit} type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginUserForm;