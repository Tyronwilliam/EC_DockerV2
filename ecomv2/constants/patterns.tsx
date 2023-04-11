export const passwordPattern =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).{8,16}$";
export const urlPattern =
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
export const emailPattern =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface PasswordValidationMessages {
  lowercase?: string;
  uppercase?: string;
  digit?: string;
  special?: string;
  length?: string;
}

export function validatePassword(
  password: string,
  messages?: PasswordValidationMessages
): string[] {
  const errors: string[] = [];
  if (!password.match(passwordPattern)) {
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push(
        messages?.lowercase ??
          "Le mot de passe doit contenir au moins une lettre minuscule"
      );
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push(
        messages?.uppercase ??
          "Le mot de passe doit contenir au moins une lettre majuscule"
      );
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push(
        messages?.digit ?? "Le mot de passe doit contenir au moins un chiffre"
      );
    }
    if (!/(?=.*[-+_!@#$%^&*.,?])/.test(password)) {
      errors.push(
        messages?.special ??
          "Le mot de passe doit contenir au moins un caractère spécial"
      );
    }
    if (!/.{8,16}/.test(password)) {
      errors.push(
        messages?.length ??
          "Le mot de passe doit comporter entre 8 et 16 caractères"
      );
    }
  }
  return errors;
}
export const validateEmail = (email: string) => {
  if (!email.match(emailPattern)) {
    return "Adresse email invalide";
  }
  return "";
};
export const validateRequiredField = (value: string) => {
  if (value.trim() === "") {
    return "Veuillez remplir le champ ci-dessus";
  }
  return "";
};
