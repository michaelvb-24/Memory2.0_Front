import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import styles from "./ForgotPassword.module.scss";
import { resetPassword } from "../apis/forgotpassword";

export default function ForgotPassword() {
  const { user } = useContext(AuthContext);
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Un e-mail doit être saisi")
      .email("Email non valide"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    clearErrors,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function submit(values) {
    console.log(values);
    resetPassword(values);
  }

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className={`${styles.forgotPassword}`}>
            <NavLink to="/SignIn">
              <i className="fa-solid fa-left-long"></i>Retour
            </NavLink>
            <div className={`${styles.formInfo}`}>
              <h1>REINITIALISER VOTRE MOT DE PASSE</h1>
              <p>Veuillez saisir votre adresse e-mail ci-dessous.</p>
              <p>
                Nous vous enverrons les instructions pour créer un nouveau mot
                de passe.
              </p>

              <form onSubmit={handleSubmit(submit)}>
                <input
                  placeholder="Adresse e-mail..."
                  type="email"
                  id="email"
                  name="email"
                  {...register("email")}
                />
                <button>Réinitialiser</button>
              </form>
            </div>
          </section>
          {/* <p>TEST</p> */}
        </>
      )}
    </>
  );
}
