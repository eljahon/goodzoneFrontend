import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { setLocalStorage } from "../libs/localStorage";
import swal from "sweetalert";
import { setUser } from "../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";

export default function LoginModal({ closeModal, goRegister, goCheckout }) {
  const dispatch = useDispatch();
  // changed register to goRegister because I used register from useForm (react-hook-form)
  // to avoid duplicate variables

  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  useEffect(() => {
    setLoad(true);
    document.body.classList.add("overflow");
    return () => {
      setLoad(false);
      document.body.classList.remove("overflow");
    };
  });

  const { register, handleSubmit, errors } = useForm();

  const checkUser = async (data) => {
    console.log(process.env.CHECK_USER_API_URL);
    try {
      const response = await axios.get(
        `${
          process.env.CHECK_USER_API_URL +
          `?phone=%2B` +
          data.phoneNumber.substring(1, data.phoneNumber.length)
        }`
      );

      if (response.data.exists) {
        setIsLogin(true);
        setErrorText("");
      } else {
        setErrorText("Вы еще не зарегистрированы в сети");
      }
    } catch (error) {
      swal(error.response.data);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/` + process.env.LOGIN_API_URL,
        {
          password: data.password,
          phone: data.phoneNumber,
        }
      );

      const {
        data: { access_token },
      } = response;

      if (response.status === 200) {
        setLocalStorage("access_token", access_token);
        dispatch(setUser(response.data));
        if (goCheckout) router.push("/checkout");
        closeModal();
        console.log(response.data);
      }
    } catch (error) {
      swal(error.response.data.Error.Message);
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
            {resetPassword ? (
              <div className="auth_form-container">
                <h3>Забыли пароль</h3>
                <span className="sub_heading">
                  Мы вышлем вам код для сброса пароля
                </span>
                <form>
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="Номер телефона"
                    required
                  />
                  <button type="submit" className="btn btn_submit">
                    Сброс пароля
                  </button>
                </form>
                <p className="auth_form-offer">
                  <span>Вернуться к </span>
                  <button
                    className="btn"
                    onClick={() => setResetPassword(false)}
                  >
                    {" "}
                    Авторизации
                  </button>
                </p>
              </div>
            ) : (
              <>
                <div className="auth_form-container">
                  <h3>Добро пожаловать</h3>
                  <span className="sub_heading">
                    Войдите с вашим номером телефона и паролем
                  </span>
                  <form onSubmit={handleSubmit(isLogin ? onSubmit : checkUser)}>
                    <input
                      ref={register({
                        maxLength: 13,
                        minLength: 13,
                      })}
                      type="tel"
                      name="phoneNumber"
                      defaultValue="+998"
                      required
                    />
                    {errors.phoneNumber && (
                      <p>Phone number should be 13 characters long</p>
                    )}
                    {errorText.length !== 0 && !isLogin ? (
                      <p>{errorText}</p>
                    ) : (
                      ""
                    )}
                    <input
                      ref={register}
                      type={!isLogin ? "hidden" : "password"}
                      name="password"
                      placeholder="Пароль"
                      required
                    />
                    <button
                      type={errorText ? "button" : "submit"}
                      className="btn btn_submit"
                      onClick={errorText && !isLogin ? goRegister : ""}
                    >
                      {errorText && !isLogin ? "Регистрация" : "Войти"}
                    </button>
                  </form>

                  <p className="auth_form-offer">
                    {!errorText ? (
                      <div>
                        <span>У вас нет аккаунта? </span>
                        <button className="btn" onClick={goRegister}>
                          {" "}
                          Регистрация
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                {isLogin ? (
                  <div className="auth_form-offer-section">
                    <p className="auth_form-offer">
                      <span>Забыли пароль? </span>
                      <button
                        className="btn"
                        onClick={() => setResetPassword(true)}
                      >
                        {" "}
                        Сбросить
                      </button>
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
