import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";

export default function RegisterModal({ closeModal, login }) {
    const [load, setLoad] = useState(false);
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
                        <div className="auth_form-container">
                            <h3>Регистрация</h3>
                            <span className="sub_heading"></span>
                            <form>
                                <input type="text" name="first_name" placeholder="Имя" required />
                                <input type="text" name="last_name" placeholder="Фамилия" required />
                                <input type="tel" name="phone_number" placeholder="Номер телефона" required />
                                <input type="password" name="password" placeholder="Пароль" required />
                                <input type="password" name="password_confirmation" placeholder="Подтверждение пароля" required />
                                <button type="submit" className="btn btn_submit">Регистрация</button>
                            </form>
                            <p className="auth_form-offer">
                                <span>Уже есть аккаунт? </span>
                                <button className="btn" onClick={login}> Войти</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}