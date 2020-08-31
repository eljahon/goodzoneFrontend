import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { setLocalStorage } from "../libs/localStorage";
import swal from "sweetalert";
import { setUser } from "../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";

export default function ResetPasswordModal({
  userInfo,
  setUserInfo,
  setResetPassword,
}) {
  const { register, handleSubmit } = useForm();
  const [disabled, setDisabled] = useState(false);
  const updatePassword = async (data) => {
    setDisabled(true);
    if (data.password !== data.passwordConfirmation) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await axios.put(
        process.env.PROFILE_API_URL,
        {
          lastname: userInfo.lastname,
          name: userInfo.name,
          password: data.password,
        },
        {
          headers: {
            Authorization: userInfo.authToken,
          },
        }
      );
      if (response.status === 200) {
        setDisabled(false);
        setResetPassword(false);
      }
    } catch (error) {
      swal(error.response.data.Error.Message);
    }
  };

  return (
    <form onSubmit={handleSubmit(updatePassword)}>
      <input
        ref={register}
        name="name"
        defaultValue={userInfo.name}
        onChange={setUserInfo}
        placeholder="Имя"
        required
      />
      <input
        ref={register}
        name="lastName"
        defaultValue={userInfo.lastname}
        onChange={setUserInfo}
        placeholder="Фамилия"
        required
      />
      <input
        ref={register}
        type="password"
        name="password"
        placeholder="Введите новый пароль"
        required
      />
      <input
        ref={register}
        type="password"
        name="passwordConfirmation"
        placeholder="Подтверждение пароля"
        required
      />
      <button disabled={disabled} type="submit" className="btn btn_submit">
        Отправить
      </button>
    </form>
  );
}
