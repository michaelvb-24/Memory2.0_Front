import { useForm } from "react-hook-form";
import styles from "./signup.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser } from "../../apis/users";

export function Signup() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("L'email doit être valide")
      .required("Ce champ doit être saisi"),
    pseudo: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(2, "Au moins deux lettres"),
    password: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(6, "Ce champs doit contenir au moins 6 caractères"),
  });

  const intialValues = {
    email: "Email",
    pseudo: "Pseudo",
    password: "Mot de Passe",
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
      console.log(values);
      clearErrors();
      await createUser(values);
      navigate("/");
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
    console.log(values);
  });

  return (
    <div className={`${styles.signin}`}>
      <form onSubmit={submit} className={`${styles.form}`}>
        <h2 className="mb10">Inscription</h2>
        <div className={`${styles.pseudo}`}>
          <input
            type="text"
            id="email"
            {...register("email")}
            placeholder="Email..."
          />
          {errors?.email && <p className="error">{errors.email.message}</p>}
        </div>
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
            {...register("password")}
            placeholder="Mot de passe..."
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        {errors.generic && (
          <p className="form-error">{errors.generic.message}</p>
        )}
        <p className={`${styles.consent}`}>
          En vous inscrivant, vous consentez à adhérer à nos{" "}
          <NavLink to="/MentionCgu">Condition Générales d'utilisation</NavLink>
        </p>
        <div>
          <button disabled={isSubmitting} className={"btn btn-primary"}>
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}
