import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";

export default function LoginModal({ closeModal, register }) {
    const [load, setLoad] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    useEffect(() => {
        setLoad(true);
        document.body.classList.add('overflow');
        return () => {
            setLoad(false);
            document.body.classList.remove('overflow');
        }
    })
    return (
        <div className="login_modal-wrapper">
            <button className="btn close_btn" onClick={closeModal}>
                <FaTimes />
            </button>
            <div className={`login_modal-holder ${load ? 'show' : ''}`}>
                <div className="inner_block">
                    <div className="auth_form">
                        {resetPassword ?
                            <div className="auth_form-container">
                                <h3>Забыли пароль</h3>
                                <span className="sub_heading">Мы вышлем вам код для сброса пароля</span>
                                <form>
                                    <input type="tel" name="phone_number" placeholder="Номер телефона" required />
                                    <button type="submit" className="btn btn_submit">Сброс пароля</button>
                                </form>
                                <p className="auth_form-offer">
                                    <span>Вернуться к </span>
                                    <button className="btn" onClick={() => setResetPassword(false)}> Авторизации</button>
                                </p>
                            </div>
                            :
                            <>
                                <div className="auth_form-container">
                                    <h3>Добро пожаловать</h3>
                                    <span className="sub_heading">Войдите с вашим номером телефона и паролем</span>
                                    <form>
                                        <input type="tel" name="phone_number" placeholder="Номер телефона" required />
                                        <input type="password" name="password" placeholder="Пароль" required />
                                        <button type="submit" className="btn btn_submit">Войти</button>
                                    </form>
                                    <p className="auth_form-offer">
                                        <span>У вас нет аккаунта? </span>
                                        <button className="btn" onClick={register}> Регистрация</button>
                                    </p>
                                </div>
                                <div className="auth_form-offer-section">
                                    <p className="auth_form-offer">
                                        <span>Забыли пароль? </span>
                                        <button className="btn" onClick={() => setResetPassword(true)}> Сбросить</button>
                                    </p>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}