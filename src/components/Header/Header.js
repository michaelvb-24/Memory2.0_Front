import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context";
import logo from "../../img/logoMemorize.png";

export default function Header() {
  const { user, signout } = useContext(AuthContext);
  console.log(user);
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.homeContainer}`}>
        <NavLink to="/" className={styles.homeTitle}>
          <img src={logo} className={styles.logo} />
        </NavLink>
      </div>
      {user ? (
        <ul className={`${styles.desktopHeader}`}>
          {/* icon profil */}
          <NavLink to="/Profil" className={`${styles.ProfilTitle}`}>
            <i className="fa-regular fa-user"></i>
          </NavLink>
          <NavLink to="/Jeux" className={`${styles.playTitle}`}>
            <i className="fas fa-regular fa-gamepad"></i>
          </NavLink>

          <NavLink className={`${styles.rankTitle}`} to="/classement">
            <i className="fa-regular fa-star"></i>
          </NavLink>
          <NavLink
            className={`${styles.logoutTitle}`}
            onClick={() => signout()}
            to="/SignIn"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </NavLink>
        </ul>
      ) : (
        <ul className={`${styles.desktopHeader}`}>
          <NavLink className={`${styles.signupTitle}`} to="signup">
            <i className="fa-solid fa-right-to-bracket"></i>
          </NavLink>
          <NavLink to="signin" className={`${styles.signinTitle}`}>
            <i className="fa-solid fa-user"></i>
          </NavLink>
        </ul>
      )}
    </header>
  );
}
