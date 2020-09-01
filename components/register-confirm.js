import React from "react";
import { useForm } from "react-hook-form";
import { axiosAuth } from "../libs/axios/axios-instances";
import { useRouter } from "next/router";
import { createFormData } from "../libs/createFormData";

const RegisterConfirm = ({ phoneNumber, goCheckout }) => {
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
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="auth_form-container">
      <h3>Подтвердить пароль</h3>
      <span className="sub_heading"></span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} name="code" placeholder="Код" required />
        <input type="tel" name="phone" defaultValue={phoneNumber} disabled />
        <input type="submit" className="btn btn_submit" value="Отправить" />
      </form>
      <p className="auth_form-offer"></p>
    </div>
  );
};

export default RegisterConfirm;
