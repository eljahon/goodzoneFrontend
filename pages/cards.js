import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import { withTranslation } from "../i18n";
import { FaPencilAlt, FaTimes, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import CardsModal from "../components/cards-modal";
import { useSelector } from "react-redux";
import { axiosAuth } from "../libs/axios/axios-instances";
import { useForm } from "react-hook-form";
import { getLocalStorage } from "../libs/localStorage";
import axios from "axios";
import { createFormData } from "../libs/createFormData";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";

function Cards({ t }) {
  const [addressModal, editAddressModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [address, setAddress] = useState({
    phone: "",
    card_number: "",
  });

  const [getUserData, setGetUserData] = useState({
    number: "",
    phone: "",
    code: "",
  });
  const user = useSelector((state) => state.auth.user);

  const { handleSubmit } = useForm();

  useEffect(() => {
    getCreditCards();
  }, []);

  const getCreditCards = () => {
    axios
      .get(`${process.env.CUSTUMER_CARD_GET_CARDS_API_URL}?user_id=${user.id}`)
      .then(({ data }) => {
        console.log("cards => ", data);
        setCardData(data.customer_card);
      })
      .catch((error) => console.error(error));
  };
  //   const Timer = (props) => {
  //     const {initialMinute = 0,initialSeconds = 0} = props;
  //     const [ minutes, setMinutes ] = useState(initialMinute);
  //     const [seconds, setSeconds ] =  useState(initialSeconds);
  //     useEffect(()=>{
  //     let myInterval = setInterval(() => {
  //             if (seconds > 0) {
  //                 setSeconds(seconds - 1);
  //             }
  //             if (seconds === 0) {
  //                 if (minutes === 0) {
  //                     clearInterval(myInterval)
  //                 } else {
  //                     setMinutes(minutes - 1);
  //                     setSeconds(59);
  //                 }
  //             }
  //         }, 1000)
  //         return ()=> {
  //             clearInterval(myInterval);
  //           };
  //     });

  //     return (
  //         <div>
  //         { minutes === 0 && seconds === 0
  //             ? null
  //             : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
  //         }
  //         </div>
  //     )
  // }
  return (
    <>
      <SEO />
      <div className="profile_wrapper">
        <ProfileNav activeTab="cards" />
        <div className="order_box">
          <div className="order_list-wrapper d-block">
            <div className="order_content-wrapper">
              <div className="order_content">
                <div className="order_list">
                  <div className="my-custom-cards-holder address_card">
                    <div className="card_header">
                      <span>{t("my-cards")}</span>
                    </div>
                    <div className="card_body">
                      {cardData?.length === 0 ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="../Purse_svg.svg"
                            alt="Purse"
                            style={{
                              maxWidth: "60px",
                              width: "100%",
                              marginBottom: "23px",
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontStyle: "normal",
                              fontSize: "18px",
                              lineHeight: "19px",
                              letterSpacing: "0.01em",
                              color: "#9AA6AC",
                            }}
                          >
                            {t("not-found-card")}{" "}
                          </span>
                        </div>
                      ) : (
                        cardData.map((el) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src="../goodCard.svg"
                                alt="Purse"
                                style={{
                                  maxWidth: "60px",
                                  width: "100%",
                                  marginRight: "18px",
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontSize: "18px",
                                    lineHeight: "19px",
                                    letterSpacing: "0.01em",
                                    marginBottom: "4px",
                                    color: "#9AA6AC",
                                  }}
                                >
                                  Карта лояльности
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontSize: "18px",
                                    lineHeight: "19px",
                                    letterSpacing: "0.01em",

                                    color: "#9AA6AC",
                                  }}
                                >
                                  {el.number}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "Inter",
                                    fontStyle: "normal",
                                    fontSize: "18px",
                                    lineHeight: "19px",
                                    letterSpacing: "0.01em",
                                    color: "#9AA6AC",
                                  }}
                                >
                                  {el.phone}
                                </span>
                              </div>
                            </div>
                            <span>{el.balance}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <div style={{ padding: "24px 16px" }}>
                      <button
                        className="btn add_btn myBtn"
                        onClick={() => {
                          editAddressModal(true);
                        }}
                      >
                        <span className="btn_text">{t("add-new-card")}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addressModal && (
        <CardsModal
          getUserData={getUserData}
          setGetUserData={setGetUserData}
          closeModal={() => editAddressModal(false)}
          address={address}
          setOpen={setOpen}
          setAddress={setAddress}
          editAddressModal={editAddressModal}
          setCardData={setCardData}
          // onSubmit={profilDataFunc}
        />
      )}
      <Footer />
    </>
  );
}

export default withTranslation("checkout")(Cards);

export async function getServerSideProps({ req }) {
  const urls = [`${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`];

  const [categories] = await fetchMultipleUrls(urls);

  return {
    props: {
      categories,
    },
  };
}
