import React, { useContext } from "react";
import { AuthContext } from "../../context";
import { NavLink } from "react-router-dom";
import styles from "./ModalDelete.module.scss";

export const ModalDelete = ({ deleteUser }) => {
  const { user, signout } = useContext(AuthContext);

  // delete user connecté

  async function handleDeleteUser(deleteuser) {
    console.log(deleteuser);
    try {
      const response = await fetch(
        "http://localhost:8000/api/users/deleteUser",
        {
          method: "POST",
          body: JSON.stringify(deleteuser),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        deleteUser(deleteuser);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.modalContainer}>
      <h2 className={styles.titlePseudo}>
        Êtes vous sûr de vouloir supprimer votre compte ?
      </h2>
      <p>Cette action est irréversible</p>
      <div className={styles.buttonContainer}>
        <NavLink onClick={() => signout()} to="/SignIn">
          <button onClick={() => handleDeleteUser(user)}>Confirmer</button>
        </NavLink>

        <button onClick={() => window.location.reload()}>Annuler</button>
      </div>
    </div>
  );
};
