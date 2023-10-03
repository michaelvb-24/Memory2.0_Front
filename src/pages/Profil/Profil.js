import { useContext, useState } from "react";
import styles from "./Profil.module.scss";
import { AuthContext } from "../../context";
import avatar from "../../img/avatarDeProfil.png";
import { Modal } from "../../components/modalModifPseudo/Modal";
import ModalPassword from "../../components/modalModifPassword/ModalPassword";
import { ModalDelete } from "../../components/ModalDeleteUser/ModalDelete";

export function Profil() {
  const { user } = useContext(AuthContext);
  const userPseudo = user?.pseudo;
  const [openModifyPseudo, setOpenModifyPseudo] = useState(false);
  const [openModifyPassword, setOpenModifyPassword] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  return (
    <div className={styles.profilContainer}>
      {/* en tete de la page d'accueil */}
      <div className={styles.presentation}>
        <p>{userPseudo}</p>
        <img src={avatar} />
      </div>
      {/* container de boutons modifier les données & supprimer le compte */}
      <div className={styles.dataContainer}>
        {/* modifier le mot de passe */}
        <div className={styles.pseudoContainer}>
          <h3>Pseudo :</h3>
          <p>{userPseudo}</p>
          <i
            className="fa-solid fa-pen"
            onClick={() => setOpenModifyPseudo(!openModifyPseudo)}
          ></i>
        </div>
        {openModifyPseudo ? <Modal /> : ""}
        {/* modifier mot de passe container */}
        <div className={styles.passwordContainer}>
          <h3>Mot de passe :</h3>
          <p>•••••••••</p>
          <i
            className="fa-solid fa-pen"
            onClick={() => setOpenModifyPassword(!openModifyPassword)}
          ></i>
        </div>
        {openModifyPassword ? <ModalPassword /> : ""}
        {/* ouvre la modal de confirmation delete user */}
        <button
          className={styles.buttonDelete}
          onClick={() => setOpenDeleteUser(!openDeleteUser)}
        >
          Supprimer votre compte
        </button>
        {openDeleteUser ? <ModalDelete /> : ""}
      </div>
    </div>
  );
}
