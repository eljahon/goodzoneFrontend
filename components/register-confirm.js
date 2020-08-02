import React from "react";
import { useForm } from "react-hook-form";
import { axiosAuth } from "../libs/axios/axios-instances";
import swal from "sweetalert";
import { Router } from "next/router";

const RegisterConfirm = ({ phoneNumber, goCheckout }) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        axiosAuth
            .post(`${process.env.AUTHORIZE_API_URL}/verify-phone`, {
                code: data.code,
                phone: data.phone,
            })
            .then((response) => {
                if (response.status === 200) {
                    // swal("Phone number verified succesfully!");
                    if(goCheckout) {
                        Router.push('/checkout')
                    } else {
                        Router.push("/profile");
                    }
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    // swal("Code is incorrect. Please try again");
                    console.log(error)
                } else if (error.response.status === 500) {
                    // swal("Internal Server error");
                    console.log(error)
                }
            });
    };
    return (
        <div className="auth_form-container">
            <h3>Подтвердить пароль</h3>
            <span className="sub_heading"></span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input ref={register} name="code" placeholder="Код" required />
                <input
                    type="tel"
                    name="phone"
                    defaultValue={phoneNumber}
                    disabled
                />
                <input
                    type="submit"
                    className="btn btn_submit"
                    value="Отправить"
                />
            </form>
            <p className="auth_form-offer"></p>
        </div>
    );
};

export default RegisterConfirm;
