import React, { useContext } from "react";
import { AuthContext } from "../../context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../apis/users";
import styles from "./ModalPassword.module.scss";

function ModalPassword() {
  const { user } = useContext(AuthContext);
  const validationSchema = yup.object({
    mdp: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(6, "Au moins six lettres"),
    id: yup.number(),
  });

  const intialValues = {
    mdp: user.mdp,
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
      await updatePassword(values);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <form onSubmit={submit} className={styles.modalContainer}>
      <div>
        <h2 className={styles.titlePseudo}>Nouveau mot de passe : </h2>
        <input
          className={styles.input}
          defaultValue={intialValues.mdp}
          placeholder="Nouveau mot de passe..."
          type="password"
          name="mdp"
          {...register("mdp")}
        />
      </div>
      <button disabled={isSubmitting} onClick={() => window.location.reload()}>
        Valider
      </button>
      <button onClick={() => window.location.reload()}>Annuler</button>
    </form>
  );
}

export default ModalPassword;
