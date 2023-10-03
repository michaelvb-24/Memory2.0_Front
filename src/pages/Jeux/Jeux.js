import { NavLink, Outlet } from 'react-router-dom'
import styles from './Jeux.module.scss';

export function Jeux() {
    return (

        <div className={`${styles.niveauContainer}`}>
            <h2 className={`${styles.title}`}>Jeux</h2>

            <div className={`${styles.gameContainer}`}>
                <div className={`${styles.easyMode}`}>
                    <h3>Mode facile</h3>
                    <NavLink to="/RomainEasy">
                        <button>Jouer</button>
                    </NavLink>
                </div>
                <div className={`${styles.hardMode}`}>
                <h3>Mode difficile</h3>
                    <NavLink to="/Flo">
                        <button>Jouer</button>
                    </NavLink>
                </div>

                <Outlet />
            </div>

        </div>
    )
}