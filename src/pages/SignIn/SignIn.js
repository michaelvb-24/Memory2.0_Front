import { useForm } from "react-hook-form";
import styles from "./signin.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, NavLink } from "react-router-dom";

export function Signin() {
  const { signin, user } = useContext(AuthContext);

  const validationSchema = yup.object({
    pseudo: yup.string().required("Ce champ doit être saisi"),
    password: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(6, "Ce champs doit contenir au moins 6 caractères"),
  });

  const intialValues = {
    pseudo: "",
    password: "",
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
      console.log(values);
      await signin(values);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });
  // async function getForgotPassword() {
  //   await forgotPassword();
  // }
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div className={`${styles.signin}`}>
          <form onSubmit={submit} className={` ${styles.form}`}>
            <h2>Connexion</h2>
            <div className={`${styles.pseudo}`}>
              <input
                type="text"
                name="pseudo"
                {...register("pseudo")}
                placeholder="Pseudo..."
              />
              {errors.pseudo && (
                <p className="form-error">{errors.pseudo.message}</p>
              )}
            </div>
            <div className={`${styles.password}`}>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe..."
                {...register("password")}
              />
              {errors.password && (
                <p className="formError">{errors.password.message}</p>
              )}
            </div>
            {errors.generic && (
              <p className="formError">{errors.generic.message}</p>
            )}
            <NavLink
              className={`${styles.forgotPassword}`}
              to="/forgotpassword"
            >
              Mot de passe oublié ?
            </NavLink>
            <div>
              <button disabled={isSubmitting} className={"btn btn-primary"}>
                Connexion
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
