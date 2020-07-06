import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import { axiosAuth } from "../libs/axios/axios-instances";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Profile({ categories }) {
    const [changePasswordStatus, setChangePasswordStatus] = useState(false);
    const { register, handleSubmit, errors } = useForm();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        axiosAuth
            .get()
            .then((response) => {
                const {
                    data: { customer: user },
                } = response;
                setUserData(user);
            })
            .catch((error) => console.error(error));
    }, []);

    const onSubmit = (data) => {
        const { password, confirmPassword } = data;

        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }
        }

        console.log("data", data);
    };

    return (
        userData && (
            <>
                <SEO title="Goodzone" />
                <Header categories={categories} />
                <div className="profile_wrapper">
                    <ProfileNav activeTab="profile" />
                    <div className="profile_content">
                        <div className="settings_form">
                            <div className="settings_form-content">
                                <div className="heading">
                                    <h3>Личный кабинет</h3>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="input_wrapper">
                                        <label htmlFor="firstName">Имя</label>
                                        <input
                                            ref={register}
                                            defaultValue={userData.name}
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                        />
                                    </div>
                                    <div className="input_wrapper">
                                        <label htmlFor="lastName">
                                            Фамилия
                                        </label>
                                        <input
                                            ref={register}
                                            defaultValue={userData.lastname}
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            required
                                        />
                                    </div>
                                    <div className="input_wrapper">
                                        <label htmlFor="phone">Телефон</label>
                                        <input
                                            ref={register}
                                            defaultValue={userData.phone}
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            required
                                        />
                                    </div>
                                    <div className="btn_wrapper">
                                        <button
                                            type="button"
                                            className="btn btn_submit"
                                            onClick={() =>
                                                setChangePasswordStatus(
                                                    !changePasswordStatus
                                                )
                                            }
                                        >
                                            Change password
                                        </button>
                                    </div>
                                    {changePasswordStatus ? (
                                        <>
                                            <div className="input_wrapper">
                                                <label htmlFor="password">
                                                    Пароль
                                                </label>
                                                <input
                                                    ref={register}
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                />
                                            </div>
                                            <div className="input_wrapper">
                                                <label htmlFor="passwordConfirm">
                                                    Подтверждение пароля
                                                </label>
                                                <input
                                                    ref={register}
                                                    type="password"
                                                    name="passwordConfirm"
                                                    id="passwordConfirm"
                                                />
                                            </div>
                                        </>
                                    ) : null}
                                    <div className="btn_wrapper">
                                        <input
                                            type="submit"
                                            className="btn btn_submit"
                                            value="Обновить"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    );
}

export async function getServerSideProps() {
    // Please write to me if you have some problems with understanding this fetchMultipleUrls function
    // I wrote it for not repeating code and making us easier
    const urls = [process.env.CATEGORY_API_URL];
    const [{ categories }] = await fetchMultipleUrls(urls);

    return {
        props: {
            categories,
        },
    };
}
