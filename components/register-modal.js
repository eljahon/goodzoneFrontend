import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setLocalStorage } from "../libs/localStorage";
import { setUser } from "../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";
import RegisterConfirm from "./register-confirm";
import { createFormData } from "../libs/createFormData";

export default function RegisterModal({ closeModal, login, goCheckout }) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [registerConfirm, setRegisterConfirm] = useState(false);
  const [userPassword, setUserPassword] = useState(null);

  useEffect(() => {
    setLoad(true);
    document.body.classList.add("overflow");
    return () => {
      setLoad(false);
      document.body.classList.remove("overflow");
    };
  });

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirmation) {
      alert("Passwords don't match");
      return;
    }

    try {
      let formData = createFormData({
        lastname: data.lastName,
        name: data.firstName,
        password: data.password,
        phone: data.phoneNumber,
      });
      const response = await axios.post(process.env.REGISTER_API_URL, formData);

      const {
        data: { access_token },
      } = response;

      if (response.status === 200) {
        setLocalStorage("access_token", access_token);
        setUserPassword(response.data.phone);
        setRegisterConfirm(true);
        dispatch(setUser(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const wrapperRef = useRef(null);
  useOutsideCloseMenu(wrapperRef);

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className="login_modal-wrapper">
      <button className="btn close_btn" onClick={closeModal}>
        <FaTimes />
      </button>
      <div
        className={`login_modal-holder ${load ? "show" : ""}`}
        ref={wrapperRef}
      >
        <button className="btn close_btn" onClick={closeModal}>
          <FaTimes />
        </button>
        <div className="inner_block">
          <div className="auth_form">
            {registerConfirm ? (
              <RegisterConfirm
                phoneNumber={userPassword}
                goCheckout={goCheckout}
              />
            ) : (
              <div className="auth_form-container">
                <h3>Регистрация</h3>
                <span className="sub_heading"></span>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    ref={register}
                    name="firstName"
                    placeholder="Имя"
                    required
                  />
                  <input
                    ref={register}
                    name="lastName"
                    placeholder="Фамилия"
                    required
                  />
                  <input
                    ref={register({
                      maxLength: 13,
                      minLength: 13,
                    })}
                    defaultValue="+998"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Номер телефона"
                    required
                  />
                  {errors.phoneNumber && (
                    <p>Phone number should be 13 characters long</p>
                  )}
                  <input
                    ref={register}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                  />
                  <input
                    ref={register}
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Подтверждение пароля"
                    required
                  />
                  <button type="submit" className="btn btn_submit">
                    Регистрация
                  </button>
                </form>
                <p className="auth_form-offer">
                  <span>Уже есть аккаунт? </span>
                  <button className="btn" onClick={login}>
                    {" "}
                    Войти
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
