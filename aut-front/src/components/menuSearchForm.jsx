import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/css/menuSearchStyle.module.css'

function MenuSearchForm() {
    return (
            <div className={styles.menuContainer}>
                <nav>
                    <ul className={styles.menuList}>
                        <li className={styles.menuItem}>
                            <Link to="/search-name" className={styles.menuLink}>Buscar por nombre</Link>
                        </li>
                        <li className={styles.menuItem}>
                            <Link to="/search-email" className={styles.menuLink}>Buscar por correo</Link>
                        </li>
                    </ul>
                </nav>
            </div>
    );
}

export default MenuSearchForm;