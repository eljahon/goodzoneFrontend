import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import { withTranslation } from "../i18n"
import { FaPencilAlt, FaTimes, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddressModal from "../components/address-modal";

function Address({ t }) {
    const [addressModal, editAddressModal] = useState(false)
    return (
        <>
            <SEO />
            <div className="profile_wrapper">
                <ProfileNav activeTab="address" />
                <div className="order_box">
                    <div className="order_list-wrapper">
                        <div className="address_header">
                            <h3>{t("my-addresses")}</h3>
                            <button className="btn add_btn">
                                <FaPlus />
                                <span className="btn_text">{t('add-address')}</span>
                            </button>
                        </div>
                        <div className="order_content-wrapper">
                            <div className="order_content">
                                <div className="order_list">
                                    <div className="order_card address_card">
                                        <div className="card_header">
                                            <span>Home</span>
                                        </div>
                                        <div className="card_body">
                                            <span>27 Street, 2569 Heritage Road Visalia, CA 93291</span>
                                        </div>
                                        <div className="actions">
                                            <button className="btn action_btn btn-primary" onClick={() => editAddressModal(true)}>
                                                <FaPencilAlt />
                                            </button>
                                            <button className="btn action_btn btn-danger">
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {addressModal && <AddressModal closeModal={() => editAddressModal(false)} />}
            <Footer />
        </>
    );
}

export default withTranslation('checkout')(Address)