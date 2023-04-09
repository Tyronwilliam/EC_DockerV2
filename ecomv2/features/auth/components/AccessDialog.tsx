import { useLoginMutation, useRegisterMutation } from "@/appli/services/auth";
import { emailPattern, passwordPattern } from "@/constants/patterns";
import Dialog from "@/features/common/components/Dialog";
import { close, selectNotification } from "@/features/common/slice";
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
    nom: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.email.match(emailPattern)) {
      displayNotification({
        message: "Veuillez entrer un email valide",
        type: "error",
      });
    }
    if (!formData.password || !formData.password.match(passwordPattern)) {
      displayNotification({
        message: "Veuillez entrer un mot de passe valide",
        type: "error",
      });
    }
    if (!isLogin && formData.nom === "")
      isLogin
        ? await login({ email: formData.email, password: formData.password })
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
              if (err) {
                dispatch(setError(err.data.message));
              }
            })
        : await register({
            email: formData.email,
            password: formData.password,
            name: formData.nom,
            lastname: formData.lastname,
          })
            .unwrap()
            .then((res) => {
              displayNotification({
                message: "Votre compte est crée",
                type: "success",
              });
            })
            .catch((err) => {
              if (err) {
                dispatch(setError(err.data.message));
              }
            });
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
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          {isLogin ? null : (
            <>
              <div>
                <label htmlFor="name">Nom:</label>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  name="lastname"
                />
              </div>{" "}
              <div>
                <label htmlFor="email">Prénom:</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleChange(e)}
                  name="nom"
                />
              </div>
            </>
          )}{" "}
          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange(e)}
              name="password"
            />
            {showPassword ? (
              <BiShowAlt className="showPass" onClick={togglePassword} />
            ) : (
              <BiHide className="showPass" onClick={togglePassword} />
            )}
          </div>
          <button>{isLogin ? "Connexion" : "Continuer"}</button>
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
