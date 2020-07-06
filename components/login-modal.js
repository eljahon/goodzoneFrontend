import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setLocalStorage } from "../libs/localStorage";
import swal from "sweetalert";
import { setUser } from "../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";

export default function LoginModal({ closeModal, goRegister }) {
    const dispatch = useDispatch();
    // changed register to goRegister because I used register from useForm (react-hook-form)
    // to avoid duplicate variables

    const [load, setLoad] = useState(false);
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

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(process.env.LOGIN_API_URL, {
                password: data.password,
                phone: data.phoneNumber,
            });

            const {
                data: { access_token },
            } = response;

            if (response.status === 200) {
                setLocalStorage("access_token", access_token);
                dispatch(setUser(data));
                closeModal();
                swal("Successfully logged in!");
            }
        } catch (error) {
            swal(error.response.data.Error.Message);
        }
    };

    return (
        <div className="login_modal-wrapper">
            <button className="btn close_btn" onClick={closeModal}>
                <FaTimes />
            </button>
            <div className={`login_modal-holder ${load ? "show" : ""}`}>
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
                                    <button
                                        type="submit"
                                        className="btn btn_submit"
                                    >
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
                                        Войдите с вашим номером телефона и
                                        паролем
                                    </span>
                                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                            <p>
                                                Phone number should be 13
                                                characters long
                                            </p>
                                        )}
                                        <input
                                            ref={register}
                                            type="password"
                                            name="password"
                                            placeholder="Пароль"
                                            required
                                        />
                                        <input
                                            type="submit"
                                            className="btn btn_submit"
                                            value="Войти"
                                        />
                                    </form>
                                    <p className="auth_form-offer">
                                        <span>У вас нет аккаунта? </span>
                                        <button
                                            className="btn"
                                            onClick={goRegister}
                                        >
                                            {" "}
                                            Регистрация
                                        </button>
                                    </p>
                                </div>
                                <div className="auth_form-offer-section">
                                    <p className="auth_form-offer">
                                        <span>Забыли пароль? </span>
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                setResetPassword(true)
                                            }
                                        >
                                            {" "}
                                            Сбросить
                                        </button>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
