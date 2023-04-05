import Dialog from "@/features/common/components/Dialog";
import React, { useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useLoginMutation } from "@/app/services/auth";

type Props = {
  func: () => void;
};

export default function AccessDialog({ func }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const editEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const editPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login({ email, password });
  };
  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
      </div>
    </Dialog>
  );
}
