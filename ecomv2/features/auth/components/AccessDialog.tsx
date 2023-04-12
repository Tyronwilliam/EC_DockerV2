import { useLoginMutation, useRegisterMutation } from "@/appli/services/auth";
import { hasNonEmptyProperty } from "@/constants/function";
import {
  validateEmail,
  validatePassword,
  validateRequiredField,
} from "@/constants/patterns";
import Dialog from "@/features/common/components/Dialog";
import { close } from "@/features/common/slice";
import React, { useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useUtilityModal from "../../common/hooks/useUtilityModal";
import { selectError, setError } from "../slice";
type Props = {
  func: () => void;
};

export default function AccessDialog({ func }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { displayNotification } = useUtilityModal();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    errors: {
      firstname: "",
      lastname: "",
      email: "",
      password: [],
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let errorMessage = "";
    let arrayMessagePassword: string[] = [];
    if (e.target.name === "email") {
      errorMessage = validateEmail(e.target.value);
    } else if (e.target.name === "password") {
      arrayMessagePassword = validatePassword(e.target.value);
    } else if (e.target.name === "firstname") {
      errorMessage = validateRequiredField(e.target.value);
    } else if (e.target.name === "lastname") {
      errorMessage = validateRequiredField(e.target.value);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errors: {
        ...formData.errors,
        [e.target.name]:
          e.target.name === "password" ? arrayMessagePassword : errorMessage,
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const hasErrors = hasNonEmptyProperty(formData.errors, (value) => !value);

    if (hasErrors) {
      displayNotification({
        message: "Veuillez corriger les erreurs dans le formulaire",
        type: "error",
      });
    }
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        })
          .unwrap()
          .then(() => {
            dispatch(setError(""));
            displayNotification({
              message: "Vous êtes connecté",
              type: "success",
            });
            dispatch(close());
          })
          .catch((err) => {
            displayNotification({
              message: err.data.message,
              type: "error",
            });
          });
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.firstname,
          lastname: formData.lastname,
        })
          .unwrap()
          .then(() => {
            dispatch(setError(""));
            displayNotification({
              message: "Votre compte est créé",
              type: "success",
            });
            dispatch(close());
          });
      }
    } catch (err) {}
  };
  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleLogin = () => {
    setIsLogin(!isLogin);
    dispatch(setError(""));
  };
  return (
    <Dialog>
      <div className="form">
        <h2>{isLogin ? "Connexion" : "S'enregistrer"}</h2>
        <span onClick={toggleLogin}>
          {isLogin ? "Je n'ai pas de compte" : "J'ai déja un compte"}
        </span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </div>{" "}
            {!isLogin && formData.errors.email && (
              <span>{formData.errors.email}</span>
            )}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="lastname">Nom:</label>
                  <input
                    type="text"
                    value={formData.lastname}
                    onChange={handleChange}
                    name="lastname"
                    required
                  />
                </div>{" "}
                {!isLogin && formData.errors.lastname && (
                  <span>{formData.errors.lastname}</span>
                )}
                <div>
                  <label htmlFor="firstname">Prénom:</label>
                  <input
                    type="text"
                    value={formData.firstname}
                    onChange={(e) => handleChange(e)}
                    name="firstname"
                    required
                  />
                </div>{" "}
                {!isLogin && formData.errors.firstname && (
                  <span>{formData.errors.firstname}</span>
                )}
              </>
            )}{" "}
            <div>
              <label htmlFor="password">Mot de passe:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange(e)}
                name="password"
                required
              />
              {showPassword ? (
                <BiShowAlt className="showPass" onClick={togglePassword} />
              ) : (
                <BiHide className="showPass" onClick={togglePassword} />
              )}
            </div>{" "}
            {!isLogin && formData.errors.password && (
              <div className="error_list">
                <ul>
                  {formData.errors.password.map((erroPass, index) => {
                    return (
                      <li key={index}>
                        <span>{erroPass}</span>
                      </li>
                    );
                  })}{" "}
                </ul>
              </div>
            )}
            <button>{isLogin ? "Connexion" : "Continuer"}</button>
          </>
        </form>

        <button onClick={func} className="close">
          X
        </button>
        {error && error}
      </div>
    </Dialog>
  );
}

// Changement d'aaffichage si compte ou non OK
// Affichage erreur si mot de passe ou email invalide Login et register
// Erreur sur Register si Name et Lastname Empty
// Affichage Erreur sous chaque input si Erreur
// Ajouter CGU // Input checkBox
// Lorsque qu'il se Register => Page (composant Props) creation OK et Infos email envoyé
// Lorsque Login / Dispatch Redux de l'user et du Token ainsi que renvoie sur la page Home
// Restriction de route sur la page profil
// Quand il est confirmé le renvoyer surr le composant Page (props)
