import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={`${styles.footer}`}>
      <div className={`${styles.contactContainer}`}>
        <h2>Contact</h2>
        <p>memorycda@gmail.com</p>
        <p>06.06.86.39.04</p>
      </div>
      <div className={`${styles.pageContainer}`}>
        <h2>Pages</h2>
        <p>Accueil</p>
        <p>Classement</p>
        <p>Selection Jeux</p>
        <p>Jeux (mode facile)</p>
        <p>Jeux (mode difficile)</p>
        <p>Profil</p>
      </div>
      <div className={`${styles.mentionContainer}`}>
        <h2>Mentions légales & CGU</h2>
        <p>Mentions Légales</p>
      </div>
    </div>
  );
}
