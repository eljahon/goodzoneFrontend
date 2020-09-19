import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import { setLocalStorage } from "../libs/localStorage";
import { setUser } from "../redux/actions/authActions/authActions";
import { useDispatch, useSelector } from "react-redux";
import RegisterConfirm from "./register-confirm";
import { createFormData } from "../libs/createFormData";
import { withTranslation } from "../i18n";
import SweetAlert from "./sweet-alert";

function RegisterModal({ closeModal, login, goCheckout, t }) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [registerConfirm, setRegisterConfirm] = useState(false);
  const [noReg, setNoReg] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [clickRegister, setClick] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const phone_num = useSelector((state) => state.auth.phone);
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
    setClick(true);
    if (data.password !== data.passwordConfirmation) {
      alert("Passwords don't match");
      setClick(false);
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
      if (response.status === 200) {
        setUserInfo(response.data);
        setUserPassword(data.password);
        setRegisterConfirm(true);
      }
    } catch (error) {
      setErrorText(error.response.data.Error);
    } finally {
      setClick(false);
    }
  };

  const wrapperRef = useRef(null);
  useOutsideCloseMenu(wrapperRef);

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setNoReg(true);
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
      {!noReg ? <button className="btn close_btn" >
        <FaTimes />
      </button> : ""}

      <div
        className={`login_modal-holder ${load ? "show" : ""}`}
        ref={wrapperRef}
      >
        {/*   {!noReg ? <button className="btn close_btn" >
          <FaTimes />
        </button> : ""} */}
        <div className="inner_block">
          {noReg ? <SweetAlert closeModal={closeModal} setNoReg={setNoReg} /> :
            <div className="auth_form">
              {registerConfirm ? (
                <RegisterConfirm
                  goCheckout={goCheckout}
                  closeModal={closeModal}
                  userInfo={userInfo}
                  setRegisterConfirm={setRegisterConfirm}
                />
              ) : (
                  <div className="auth_form-container">
                    <h3>{t("register")}</h3>
                    <span className="sub_heading"></span>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {errorText && errorText.Code === "ALREADY_EXISTS" ? (
                        <p className="text-danger mb-2">{errorText.Message}</p>
                      ) : (
                          ""
                        )}
                      <input
                        ref={register}
                        name="firstName"
                        placeholder={t("name")}
                        defaultValue={userInfo ? userInfo.name : ""}
                        required
                      />
                      <input
                        ref={register}
                        name="lastName"
                        placeholder={t("lastName")}
                        defaultValue={userInfo ? userInfo.lastname : ""}
                        required
                      />
                      <input
                        ref={register({
                          maxLength: 13,
                          minLength: 13,
                        })}
                        type="tel"
                        name="phoneNumber"
                        defaultValue={userInfo ? userInfo.phone : phone_num ? phone_num : "+998"}
                        placeholder={t("phone-number")}
                        required
                      />
                      {errors.phoneNumber && (
                        <p className="text-danger">Phone number should be 13 characters long</p>
                      )}
                      <input
                        ref={register}
                        type="password"
                        name="password"
                        placeholder={t("password")}
                        defaultValue={userPassword ? userPassword : ""}
                        style={{ borderColor: errorText && errorText.Code === "BAD_REQUEST" ? "red" : "" }}
                        required
                      />
                      {errorText && errorText.Code === "BAD_REQUEST" ? (
                        <small className="text-danger">{errorText.Message}</small>
                      ) : (
                          ""
                        )}
                      <input
                        ref={register}
                        type="password"
                        name="passwordConfirmation"
                        placeholder={t("confirm-password")}
                        defaultValue={userPassword ? userPassword : ""}
                        required
                      />
                      <button
                        disabled={clickRegister}
                        type="submit"
                        className="btn btn_submit"
                      >
                        {t("register")}
                      </button>
                    </form>
                    <p className="auth_form-offer">
                      <span>{t("is-have-not-account")} </span>
                      <button className="btn" onClick={login}>
                        {" "}
                        {t("login")}
                      </button>
                    </p>
                  </div>
                )}
            </div>
          }
        </div>
      </div>
    </div>

  );
}

export default withTranslation("common")(RegisterModal);
