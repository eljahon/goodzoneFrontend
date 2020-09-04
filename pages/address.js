import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import { withTranslation } from "../i18n";
import { FaPencilAlt, FaTimes, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddressModal from "../components/address-modal";
import { useSelector } from "react-redux";
import { axiosAuth } from "../libs/axios/axios-instances";
import { useForm } from "react-hook-form";
import { getLocalStorage } from "../libs/localStorage";
import axios from "axios";
import { createFormData } from "../libs/createFormData";

function Address({ t }) {
  const [addressModal, editAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
  });
  const { handleSubmit } = useForm();
  useEffect(() => {
    axiosAuth
      .get("/profile")
      .then((response) => {
        setAddress(response.data.customer.address);
        setUserInfo((old) => {
          old.name = response.data.customer.name;
          old.lastname = response.data.customer.lastname;

          return old;
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        "https://cors-anywhere.herokuapp.com/" + process.env.PROFILE_API_URL,
        createFormData({
          address: Object.keys(data).length === 0 ? "" : data.address,
          name: userInfo.name,
          lastname: userInfo.lastname,
        }),
        {
          headers: {
            Authorization: getLocalStorage("access_token"),
          },
        }
      );

      if (response.status === 200 && Object.keys(data).length !== 0) {
        editAddressModal(false);
        setAddress(response.data.customer.address);
      } else {
        setAddress("");
        editAddressModal(false);
      }
    } catch (error) {
      swal(error.response.data.Error.Message);
    }
  };
  return (
    <>
      <SEO />
      <div className="profile_wrapper">
        <ProfileNav activeTab="address" />

        <div className="order_box">
          <div className="order_list-wrapper">
            <div className="address_header">
              <h3>{address ? t("my-addresses") : ""}</h3>
              {!address ? (
                <button
                  className="btn add_btn"
                  onClick={() => {
                    editAddressModal(true);
                  }}
                >
                  <FaPlus />
                  <span className="btn_text">{t("add-address")}</span>
                </button>
              ) : (
                ""
              )}
            </div>

            {address ? (
              <div className="order_content-wrapper">
                <div className="order_content">
                  <div className="order_list">
                    <div className="order_card address_card">
                      <div className="card_header">
                        <span>{t("home")}</span>
                      </div>
                      <div className="card_body">
                        <span>{address}</span>
                      </div>
                      <div className="actions">
                        <button
                          className="btn action_btn btn-primary"
                          onClick={() => editAddressModal(true)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          type="submit"
                          className="btn action_btn btn-danger"
                          onClick={handleSubmit(onSubmit)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {addressModal && (
        <AddressModal
          closeModal={() => editAddressModal(false)}
          address={address}
          onSubmit={onSubmit}
        />
      )}
      <Footer />
    </>
  );
}

export default withTranslation("checkout")(Address);
