import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../assets/css/searchStyle.module.css';

function SearchForm() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchResults = async () => {
            if (query.length >= 1) {
                setLoading(true);
                try {
                    const response = await fetch(`http://localhost:3000/people/search?query=${query}`, { signal: abortController.signal });
                    if (response.status === 404) {
                        toast.error(`No se encontraron personas con el nombre "${query}"`);
                        setResults([]);
                        return;
                    }
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setResults(data);
                    if (data.length > 0) {
                        toast.success(`Se encontraron las siguientes coincidencias con el nombre "${query}"`);
                    }
                } catch (error) {
                    console.error('A fetch error occurred:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        };

        const timeoutId = setTimeout(fetchResults, 1000);
        return () => {
            clearTimeout(timeoutId);
            abortController.abort();
        };
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <div className={styles.container}>
            <ToastContainer />
            <form onSubmit={(e) => e.preventDefault()}>
                <input className={styles.inputStyle} type="text" placeholder='Ingrese un nombre de contacto' value={query} onChange={handleChange} />
            </form>
            {loading ? <div className={styles.spinner}></div> : (
                <table className={styles.tableStyle}>
                    <thead>
                        <tr>
                            <th>Clave Cliente</th>
                            <th>Nombre Contacto</th>
                            <th>Correo</th>
                            <th>Teléfono Contacto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((person, index) => (
                            <tr key={index}>
                                <td>{person.claveCliente}</td>
                                <td>{person.nombreContacto}</td>
                                <td>{person.correo}</td>
                                <td>{person.telefonoContacto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchForm;