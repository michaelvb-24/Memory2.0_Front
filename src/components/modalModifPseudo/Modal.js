import React, { useContext } from "react";
import { AuthContext } from "../../context";
import { updatePseudo } from "../../apis/users";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styles from "./Modal.module.scss";

export const Modal = () => {
  const { user } = useContext(AuthContext);
  const userPseudo = user?.pseudo;

  const validationSchema = yup.object({
    pseudo: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(2, "Au moins deux lettres"),
    id: yup.number(),
  });

  const intialValues = {
    pseudo: userPseudo,
    id: user.id,
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    intialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (values) => {
    try {
      clearErrors();
      values.id = user.id;
      await updatePseudo(values);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <form onSubmit={submit} className={styles.modalContainer}>
      <div className={styles.NewPeudo}>
        <h2 className={styles.titlePseudo}>Nouveau pseudo :</h2>
        <input
          className={styles.input}
          placeholder="Nouveau pseudo..."
          defaultValue={userPseudo}
          name="pseudo"
          {...register("pseudo")}
        />
      </div>
      <button disabled={isSubmitting} onClick={() => window.location.reload()}>
        Valider
      </button>
      <button onClick={() => window.location.reload()}>Annuler</button>
    </form>
  );
};
