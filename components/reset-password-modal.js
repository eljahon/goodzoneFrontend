import React, { useState } from "react";

import { useForm } from "react-hook-form";

import axios from "axios";
import { createFormData } from "../libs/createFormData";
import swal from "sweetalert";
import { withTranslation } from "../i18n";

function ResetPasswordModal({ userInfo, setUserInfo, setResetPassword, t }) {
  const { register, handleSubmit } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [errorText, setErrorText] = useState("");
  const updatePassword = async (data) => {
    setDisabled(true);
    if (data.password !== data.passwordConfirmation) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await axios.put(
        "https://cors-anywhere.herokuapp.com/" + process.env.PROFILE_API_URL,
        createFormData({
          lastname: userInfo.lastname,
          name: userInfo.name,
          password: data.password,
        }),
        {
          headers: {
            Authorization: userInfo.access_token,
          },
        }
      );
      if (response.status === 200) {
        setResetPassword(false);
      }
    } catch (error) {
      setErrorText(error.response.data.Error);
    }
    setDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit(updatePassword)}>
      {errorText ? (
        <p className="text-danger">{errorText}</p>
      ) : (
          ""
        )}
      <input
        ref={register}
        name="name"
        defaultValue={userInfo.name}
        onChange={setUserInfo}
        placeholder={t("name")}
        required
      />
      <input
        ref={register}
        name="lastName"
        defaultValue={userInfo.lastname}
        onChange={setUserInfo}
        placeholder={t("lastName")}
        required
      />
      <input
        ref={register}
        type="password"
        name="password"
        placeholder={t("new-password")}
        required
      />
      <input
        ref={register}
        type="password"
        name="passwordConfirmation"
        placeholder={t("confirm-password")}
        required
      />
      <button disabled={disabled} type="submit" className="btn btn_submit">
        {t("send")}
      </button>
    </form>
  );
}
export default withTranslation("common")(ResetPasswordModal);
