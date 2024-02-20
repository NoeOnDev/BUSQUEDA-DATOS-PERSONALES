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
            <form className={styles.formControl} onSubmit={handleSubmit}>
            <p className={styles.title}>Login</p>
                <div className={styles.inputField}>
                    <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label className={styles.label}>Email</label>
                </div>
                <div className={styles.inputField}>
                    <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label className={styles.label}>Contraseña</label>
                </div>
                <button className={styles.submitBtn} type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginUserForm;