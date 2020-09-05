import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosAuth } from "../libs/axios/axios-instances";
import axios from "axios";
import { useRouter } from "next/router";
import { createFormData } from "../libs/createFormData";
import { withTranslation } from "../i18n";
import { setUser } from "../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";
import { setLocalStorage } from "../libs/localStorage";
import swal from "sweetalert";

const RegisterConfirm = ({
  phoneNumber,
  goCheckout,
  closeModal,
  t,
  userInfo,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [clickRegister, setClick] = useState(false);

  const onSubmit = (data) => {
    setClick(true);
    let formData = createFormData({
      code: data.code,
      phone: phoneNumber,
    });
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/${process.env.AUTHORIZE_API_URL}/verify-phone`,
        formData,
        {
          headers: {
            Authorization: userInfo.access_token,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          if (goCheckout) {
            router.push("/checkout");
          } else {
            router.push("/profile");
          }
          dispatch(setUser(userInfo));
          setLocalStorage("access_token", userInfo.access_token);
          setClick(false);
          closeModal();
          console.log(response);
        }
      })
      .catch((error) => {
        swal(error.response.data.Error.Message);
      });
  };
  return (
    <div className="auth_form-container">
      <h3>{t("confirmed-password")}</h3>
      <span className="sub_heading"></span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} name="code" placeholder={t("code")} required />
        <input type="tel" name="phone" defaultValue={phoneNumber} disabled />
        <input
          type="submit"
          className="btn btn_submit"
          disabled={clickRegister}
          value={t("send")}
        />
      </form>
      <p className="auth_form-offer"></p>
    </div>
  );
};

export default withTranslation("common")(RegisterConfirm);
