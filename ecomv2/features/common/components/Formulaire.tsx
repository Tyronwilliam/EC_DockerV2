import {
  validateEmail,
  validatePassword,
  validateRequiredField,
} from "@/constants/patterns";
import { selectUser } from "@/features/auth/slice";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { errorMessages } from "@/constants/messages";
import useUtilityModal from "../hooks/useUtilityModal";
import { useUpdateUserMutation } from "@/appli/services/auth";
import { FormData } from "@/features/auth/models";
type Props = {
  isPassword?: boolean;
  isCgv?: boolean;
  isEmailReadOnly: boolean;
  title: string;
  isEditable: boolean;
};
function Formulaire({
  isPassword,
  isCgv,
  isEmailReadOnly,
  title,
  isEditable,
}: Props) {
  const user = useSelector(selectUser);
  const { displayNotification } = useUtilityModal();
  const [editableField, setEditableField] = useState("");
  const [update] = useUpdateUserMutation();
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    zip: undefined,
    country: "",
    phone: undefined,
    password: [],
    cgv: false,
    errors: {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      phone: "",
      cgv: "",
      password: [],
    },
  });

  const handleEdit = (fieldName: string) => {
    setEditableField(fieldName);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";
    let arrayMessagePassword: string[] = [];

    if (name === editableField && !user?.[name]) {
      errorMessage = errorMessages[name as keyof typeof errorMessages];
    } else if (name === "password" && isPassword) {
      arrayMessagePassword = validatePassword(value);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: name === "password" ? arrayMessagePassword : errorMessage,
      },
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isCgv) {
      if (!formData.cgv) {
        displayNotification({
          message: "Veuillez accepte nos condition générale de vente",
          type: "error",
        });
        return;
      }
    }
    const data = {
      id: user?.id,
      name: formData.firstname ? formData.firstname : user?.name,
      lastname: formData.lastname ? formData.lastname : user?.lastname,
      email: formData.email ? formData.email : user?.email,
      phone: formData.phone ? formData.phone : user?.phone,
      address: formData.address ? formData.address : user?.address,
      zip: formData.zip ? formData.zip : user?.zip,
      city: formData.city ? formData.city : user?.city,
      country: formData.country ? formData.country : user?.country,
      cgv: formData.cgv ? formData.cgv : user?.cgv,
    };

    try {
      const res = await update(data).unwrap();
      res.status === 201
        ? displayNotification({
            message: "Changement réussi",
            type: "success",
          })
        : displayNotification({
            message: "Une erreur est survenue",
            type: "error",
          });
    } catch (err) {
      console.log(err, "front");
    }
  };
  const active = useMemo(() => {
    if (isCgv) {
      if (
        formData.address &&
        formData.city &&
        formData.zip &&
        formData.country &&
        formData.phone &&
        formData.password
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        formData.address ||
        formData.city ||
        formData.zip ||
        formData.country ||
        formData.phone ||
        formData.password
      ) {
        return false;
      }
    }
  }, [
    formData.firstname,
    formData.lastname,
    formData.email,
    formData.address,
    formData.city,
    formData.zip,
    formData.country,
    formData.phone,
    formData.password,
    formData.cgv,
  ]);
  return (
    <form className="formulaire" onSubmit={(e) => handleSubmit(e)}>
      <h1>{title}</h1>
      <div>
        <label>Prénom:</label>
        <div className="editable">
          <input
            onChange={(e) => handleChange(e)}
            value={formData.firstname}
            type="text"
            name="firstname"
            placeholder={user?.name}
            disabled={editableField === "firstname" ? false : true}
          />{" "}
          {isEditable && (
            <FiEdit
              className="edit_emoji"
              onClick={() => handleEdit("firstname")}
            />
          )}
        </div>{" "}
        {editableField === "firstname" && (
          <span>{formData.errors.firstname}</span>
        )}
      </div>
      <div>
        <label>Nom:</label>
        <div className="editable">
          <input
            onChange={(e) => handleChange(e)}
            value={formData.lastname}
            type="text"
            name="lastname"
            placeholder={user?.lastname}
            disabled={editableField === "lastname" ? false : true}
          />{" "}
          {isEditable && (
            <FiEdit
              className="edit_emoji"
              onClick={() => handleEdit("lastname")}
            />
          )}
        </div>
        {editableField === "lastname" && (
          <span>{formData.errors.lastname}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        <div className="editable">
          <input
            onChange={(e) => handleChange(e)}
            value={formData.email}
            type="email"
            name="email"
            disabled={isEmailReadOnly}
            placeholder={user?.email}
          />{" "}
        </div>
      </div>
      <div>
        <label>Adresse:</label>
        <div className="editable">
          <input
            onChange={(e) => handleChange(e)}
            value={formData.address}
            type="text"
            name="address"
            placeholder={user?.address}
            disabled={editableField === "address" ? false : true}
          />{" "}
          {isEditable && (
            <FiEdit
              className="edit_emoji"
              onClick={() => handleEdit("address")}
            />
          )}
        </div>{" "}
        {editableField === "address" && <span>{formData.errors.address}</span>}
      </div>
      <div>
        <label>Ville:</label>
        <div className="editable">
          <input
            onChange={(e) => handleChange(e)}
            value={formData.city}
            type="text"
            name="city"
            placeholder={user?.city}
            disabled={editableField === "city" ? false : true}
          />{" "}
          {isEditable && (
            <FiEdit className="edit_emoji" onClick={() => handleEdit("city")} />
          )}
        </div>{" "}
        {editableField === "city" && <span>{formData.errors.city}</span>}
      </div>
      <div>
        <label>Code Postal:</label>
        <div className="editable">
          <input
            onChange={(e) => handleChange(e)}
            value={formData?.zip}
            type="number"
            name="zip"
            placeholder={user?.zip?.toString()}
            disabled={editableField === "zip" ? false : true}
          />{" "}
          {isEditable && (
            <FiEdit className="edit_emoji" onClick={() => handleEdit("zip")} />
          )}
        </div>{" "}
        {editableField === "zip" && <span>{formData.errors.zip}</span>}
      </div>
      <div>
        <label>Pays:</label>
        <div className="editable">
          <input
            onChange={(e) => handleChange(e)}
            value={formData.country}
            type="text"
            name="country"
            placeholder={user?.country}
            disabled={editableField === "country" ? false : true}
          />{" "}
          {isEditable && (
            <FiEdit
              className="edit_emoji"
              onClick={() => handleEdit("country")}
            />
          )}
        </div>{" "}
        {editableField === "country" && <span>{formData.errors.country}</span>}
      </div>
      <div>
        <label>Téléphone:</label>
        <div className="editable">
          <input
            onChange={(e) => handleChange(e)}
            value={formData.phone}
            type="tel"
            name="phone"
            maxLength={10}
            placeholder={user?.phone?.toString()}
            disabled={editableField === "phone" ? false : true}
          />{" "}
          {isEditable && (
            <FiEdit
              className="edit_emoji"
              onClick={() => handleEdit("phone")}
            />
          )}
        </div>{" "}
        {editableField === "phone" && <span>{formData.errors.phone}</span>}
      </div>
      {isPassword && (
        <div>
          <label>Mot de passe:</label>
          <div className="editable">
            <input
              onChange={(e) => handleChange(e)}
              value={formData.password}
              type="password"
              name="password"
              disabled
            />{" "}
            {isEditable && (
              <FiEdit
                className="edit_emoji"
                onClick={() => handleEdit("password")}
              />
            )}
          </div>
        </div>
      )}
      {isCgv && (
        <div>
          <div className="checkbox_container">
            <input
              onChange={(e) => handleChange(e)}
              type="checkbox"
              name="cgv"
              checked={formData.cgv}
            />{" "}
            <p>
              En acceptant nos conditions générales de vente, vous consentez à
              adherer à blabla
            </p>
          </div>{" "}
          {editableField === "cgv" && <span>{formData.errors.cgv}</span>}
        </div>
      )}
      <button disabled={active}>Valider</button>
    </form>
  );
}

export default Formulaire;
