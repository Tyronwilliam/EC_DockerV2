import { Button } from "@/features/common";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  title: string | null;
  second_title: string | null;
  link: string | null;
  link_content: string | null;
};

export default function AccessDialog({
  title,
  second_title,
  link,
  link_content,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const editEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const editPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
  };

  return (
    <main>
      <section>
        <div>
          <h1>{title}</h1>
          <p>{second_title}</p>
          <Link href={`${link}`}>
            <a>{link_content}</a>
          </Link>
        </div>
        <form>
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              placeholder="JohnDoe@gmail.com"
              value={email}
              onChange={editEmail}
            />
          </div>
          <div>
            <label htmlFor="Password">Mot de passe:</label>
            <input
              type="password"
              placeholder="X245fHtP"
              value={password}
              onChange={editPassword}
            />
          </div>

          <Button handler={(e) => handleSubmit(e)} />
        </form>
      </section>
    </main>
  );
}
