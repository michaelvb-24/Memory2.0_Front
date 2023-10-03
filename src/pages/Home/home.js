import { NavLink, Outlet } from "react-router-dom";
import styles from "./home.module.scss";

export function Home() {
  return (
    <div>
      <div className={`${styles.homeContainer}`}>
        <h2>Memory</h2>
        <NavLink to="/Jeux">
          <button className="buttonPlay">Jouer</button>
        </NavLink>
        <div className={`${styles.pContainer}`}>
          <h3>Règle n°1</h3>
          <p>
            Le jeu de Memory est un jeu de société classique qui met au défi la
            mémoire des joueurs.
          </p>
          <h3>Règle n°2</h3>
          <p>
            Le but du jeu est de trouver des paires de cartes identiques en les
            retournant deux par deux.
          </p>
          <h3>Règle n°3</h3>
          <p>
            Les joueurs retournent tour à tour deux cartes et s'ils trouvent une
            paire, ils la conservent et marquent un point. Si les cartes
            retournées ne sont pas identiques, elles sont replacées face cachée.
          </p>
          <h3>Règle n°4</h3>
          <p>
            Le jeu se poursuit jusqu'à ce que toutes les paires aient été
            trouvées. Le joueur ayant trouvé le plus grand nombre de paires
            remporte la partie.
          </p>
          <h3>Règle n°5</h3>
          <p>
            Le Memory est un jeu amusant qui peut être adapté en fonction de
            l'âge des joueurs et peut aider à exercer la mémoire.
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
