import { useEffect, useState } from 'react';
import styles from '../Classement/Classement.module.scss';

export function Classement() {

    // afficher le classement du jeu Flo
    const [classement, setClassement] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/getScore`);
                const data = await response.json();
                console.log(response);
                setClassement(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    console.log(classement);

    //afficher le classement du jeu Romain
    const [classementRomain, setClassementRomain] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseRomain = await fetch(`http://localhost:8000/getScoreRomain`);
                const dataRomain = await responseRomain.json();
                console.log(responseRomain);
                setClassementRomain(dataRomain);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    console.log(classementRomain);


    return (
        <div className={`${styles.Classement}`}>
            <div className={`${styles.ClassementFlo}`}>
                <h2>Classement Jeux de Flo (hard mode) : </h2>
                <ol>
                    {classement.map(classement => (
                        <li>
                            <div className={`${styles.infoPlayer}`}>
                                <div className={`${styles.pseudoContainer}`}>
                                    <h3>Pseudo :</h3>
                                    <ol>{classement.pseudo}</ol>
                                </div>
                                <div className={`${styles.scoreContainer}`}>
                                    <h3>Score :</h3>
                                    <ol>{classement.score}</ol>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className={`${styles.ClassementRomain}`}>
                <h2>Classement Jeux de Romain (easy mode) : </h2>
                <ol>
                    {classementRomain.map(classementRomain => (
                        <li>
                            <div className={`${styles.infoPlayer}`}>
                                <div className={`${styles.pseudoContainer}`}>
                                    <h3>Pseudo :</h3>
                                    <p>{classementRomain.pseudo}</p>
                                </div>
                                <div className={`${styles.scoreContainer}`}>
                                    <h3>Score :</h3>
                                    <p>{classementRomain.score}</p>
                                </div>
                            </div>
                        </li>
                    ))
                    }
                </ol>
            </div>
        </div>
    )
}
