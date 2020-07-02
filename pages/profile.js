import SEO from '../components/seo'
import Header from '../components/header'
import Footer from '../components/footer';
import ProfileNav from '../components/profile-nav'
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";


export default function Profile({ categories }) {
    return (
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
                            <form>
                                <div className="input_wrapper">
                                    <label htmlFor="first_name">Имя</label>
                                    <input type="text" name="first_name" id="first_name" required />
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="last_name">Фамилия</label>
                                    <input type="text" name="last_name" id="last_name" required />
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" required />
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="password">Пароль</label>
                                    <input type="password" name="password" id="password" required />
                                </div>
                                <div className="input_wrapper">
                                    <label htmlFor="password_confirm">Подтверждение пароля</label>
                                    <input type="password" name="password_confirm" id="password_confirm" required />
                                </div>
                                <div className="btn_wrapper">
                                    <button type="submit" className="btn btn_submit">Обновить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
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