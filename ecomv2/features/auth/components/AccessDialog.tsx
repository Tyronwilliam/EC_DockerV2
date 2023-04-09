import { useLoginMutation, useRegisterMutation } from "@/appli/services/auth";
import { emailPattern, passwordPattern } from "@/constants/patterns";
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
  const [email, setEmail] = useState("");
  const [lastname, setLastName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const { displayNotification } = useUtilityModal();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const editEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const editPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const editName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const editLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.currentTarget.value);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !email.match(emailPattern)) {
      displayNotification({
        message: "Veuillez entrer un email valide",
        type: "error",
      });
    }
    if (!password || !password.match(passwordPattern)) {
      displayNotification({
        message: "Veuillez entrer un mot de passe valide",
        type: "error",
      });
    }
    isLogin
      ? await login({ email, password })
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
          email,
          password,
          name,
          lastname,
        })
          .unwrap()
          .then((res) => {
            displayNotification({
              message: "Votre compte et crée",
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
            <input type="email" value={email} onChange={(e) => editEmail(e)} />
          </div>
          {isLogin ? null : (
            <>
              <div>
                <label htmlFor="name">Nom:</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => editLastName(e)}
                />
              </div>{" "}
              <div>
                <label htmlFor="email">Prénom:</label>
                <input type="text" value={name} onChange={(e) => editName(e)} />
              </div>
            </>
          )}{" "}
          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => editPassword(e)}
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
