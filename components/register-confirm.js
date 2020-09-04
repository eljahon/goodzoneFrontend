import React from "react";
import { useForm } from "react-hook-form";
import { axiosAuth } from "../libs/axios/axios-instances";
import { useRouter } from "next/router";
import { createFormData } from "../libs/createFormData";
import { withTranslation } from "../i18n";
import swal from "sweetalert";

const RegisterConfirm = ({ phoneNumber, goCheckout, closeModal, t }) => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    let formData = createFormData({
      code: data.code,
      phone: phoneNumber,
    });
    axiosAuth
      .post(`${process.env.AUTHORIZE_API_URL}/verify-phone`, formData)
      .then((response) => {
        if (response.status === 200) {
          if (goCheckout) {
            router.push("/checkout");
          } else {
            router.push("/profile");
          }
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
        <input type="submit" className="btn btn_submit" value={t("send")} />
      </form>
      <p className="auth_form-offer"></p>
    </div>
  );
};

export default withTranslation("common")(RegisterConfirm);
