import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { setLocalStorage } from "../libs/localStorage";
import swal from "sweetalert";
import { setUser } from "../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";
import ResetPasswordModal from "./reset-password-modal";
import { withTranslation } from "../i18n";
import { createFormData } from "../libs/createFormData";

function LoginModal({ closeModal, goRegister, goCheckout, t }) {
  const dispatch = useDispatch();
  // changed register to goRegister because I used register from useForm (react-hook-form)
  // to avoid duplicate variables

  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    lastname: '',
    access_token: ''
  });
  const [isLogin, setIsLogin] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [phone, setPhone] = useState("");
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
    setDisabled(true);
    try {
      const response = await axios.get(
        `${
        process.env.CHECK_USER_API_URL +
        `?phone=%2B` +
        data.phoneNumber.substring(1, data.phoneNumber.length)
        }`
      );
      if (response.data.exists) {
        setPhone(data.phoneNumber);
        setIsLogin(true);
      } else {
        setErrorText("Вы еще не зарегистрированы в сети");
      }
    } catch (error) {
      setErrorText(error.response.data.Error.Message);
    } finally {
      setDisabled(false);
    }
  };

  const resPassword = async (data) => {

    setDisabled(true);
    try {
      if (!isSend) {
        const response = await axios.get(
          `${
          process.env.RESER_PASSWORD_API_URL +
          `?phone=%2B` +
          data.phoneNumber.substring(1, data.phoneNumber.length)
          }`
        );
        if (response.status === 200) {
          setIsSend(true);
          setPhone(data.phoneNumber);
        }
      } else {
        const response = await axios.post(
          process.env.CHECK_CODE_API_URL,
          createFormData({
            code: data.code,
            phone: phone,
          })
        );
        if (response.status === 200) {
          setIsCheck(true);
          setUserInfo((old) => {
            old.name = response.data.name,
              old.lastname = response.data.lastname,
              old.access_token = response.data.access_token
            return old;
          });
        }
      }

    } catch (error) {
      setErrorText(error.response.data.Error.Message);
    } finally {
      setDisabled(false);
    }
  };

  const onSubmit = async (data) => {
    setDisabled(true);
    let formData = createFormData({
      phone: data.phoneNumber,
      password: data.password,
    });

    try {
      const response = await axios.post(process.env.LOGIN_API_URL, formData);

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
      setErrorText(error.response.data.Error.Message);
    } finally {
      setDisabled(false);
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
                <h3>{!isCheck ? t("forget-password") : t("reset-password")}</h3>
                {!isCheck ? (
                  <span className="sub_heading">
                    {isSend ? t("send-code-phone") : t("send-code")}
                  </span>
                ) : (
                    <span className="sub_heading"></span>
                  )}
                {!isCheck ? (
                  <form onSubmit={handleSubmit(resPassword)}>
                    {errorText ? (
                      <p className="text-danger">{errorText}</p>
                    ) : (
                        ""
                      )}
                    <input
                      ref={register({
                        maxLength: 13,
                        minLength: 13,
                      })}
                      type={!isSend ? "tel" : "hidden"}
                      name="phone_number"
                      defaultValue={phone}
                      placeholder={t("phone-number")}
                    />
                    <input
                      ref={register}
                      type={!isSend ? "hidden" : "text"}
                      name="code"
                      placeholder={t("code")}
                    />

                    <button
                      type="submit"
                      disabled={disabled}
                      className="btn btn_submit"
                    >
                      {!isSend ? t("sended-code") : t("send")}
                    </button>
                  </form>
                ) : (
                    <ResetPasswordModal
                      userInfo={userInfo}
                      resetPassword={resetPassword}
                      setResetPassword={setResetPassword}
                    />
                  )}
                <p className="auth_form-offer">
                  <button
                    className="btn"
                    onClick={() => setResetPassword(false)}
                  >
                    {" "}
                    {t("register")}
                  </button>
                </p>
              </div>
            ) : (
                <>
                  <div className="auth_form-container">
                    <h3>{t("welcome")}</h3>

                    <span className="sub_heading">{t("sign-in-with-phone")}</span>
                    <form onSubmit={handleSubmit(isLogin ? onSubmit : checkUser)}>
                      {errorText ? (
                        <p className="text-danger">{errorText}</p>
                      ) : (
                          ""
                        )}

                      <input
                        ref={register({
                          maxLength: 13,
                          minLength: 13,
                        })}
                        type="tel"
                        name="phoneNumber"
                        defaultValue="+998"
                        placeholder={t("phone-number")}
                        required
                      />

                      {errors.phoneNumber && (
                        <p>Phone number should be 13 characters long</p>
                      )}

                      <input
                        ref={register}
                        type={!isLogin ? "hidden" : "password"}
                        name="password"
                        placeholder={t("password")}
                        required
                      />

                      <button
                        type={errorText && !isLogin ? "button" : "submit"}
                        className="btn btn_submit"
                        onClick={errorText && !isLogin ? goRegister : () => { }}
                        disabled={disabled}
                      >
                        {errorText && !isLogin ? t("register") : t("login")}
                      </button>
                    </form>

                    <p className="auth_form-offer">
                      <span>{t("is-have-account")}</span>
                      <button className="btn" onClick={goRegister}>
                        {" "}
                        {t("register")}
                      </button>
                    </p>
                  </div>
                  {isLogin ? (
                    <div className="auth_form-offer-section pb-4 bg-white">
                      <p className="auth_form-offer">
                        <span className="text-dark">
                          {t("forget-password")}?{" "}
                        </span>
                        <button
                          className="btn"
                          onClick={() => setResetPassword(true)}
                        >
                          {" "}
                          {t("reset")}
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
export default withTranslation("common")(LoginModal);
