import SEO from "../components/seo";
import Footer from "../components/footer";
import ProfileNav from "../components/profile-nav";
import { withTranslation } from "../i18n";
import { useEffect, useState } from "react";
import CardsModal from "../components/cards-modal";
import { useSelector } from "react-redux";
import axios from "axios";
import { fetchMultipleUrls } from "../libs/fetchMultipleUrls";
import { numberToPrice } from "../libs/numberToPrice";

function Cards({ t }) {
  const [cardModal, setCardModal] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [getUserData, setGetUserData] = useState({
    number: "",
    phone: "",
    code: "",
  });
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    getCreditCards();
  }, []);

  const getCreditCards = () => {
    axios
      .get(`${process.env.CUSTUMER_CARD_GET_CARDS_API_URL}?user_id=${user.id}`)
      .then(({ data }) => {
        setCardData(data.customer_card);
      })
      .catch((error) => console.error(error));
  };

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
                      {/* Twenty_Three inc */}
                    </div>
                    <div className="card_body">
                      {cardData?.length === 0 ? (
                        <div className="not-found-card">
                          <img
                            className="not-found-card__logo"
                            src="../Purse_svg.svg"
                            alt="Purse"
                          />
                          <span className="not-found-card__title">
                            {t("not-found-card")}{" "}
                          </span>
                        </div>
                      ) : (
                        cardData.map((el) => (
                          <div className="found-card">
                            <div className="found-card--left">
                              <img
                                className="found-card--left__logo"
                                src="../goodCard.svg"
                                alt="Purse"
                              />
                              <div className="found-card--center">
                                <span className="found-card--center__title">
                                  {t("loyalty-card")}
                                </span>
                                <span className="found-card--center__card-number">
                                  {el.number}
                                </span>
                                <span className="found-card--center__phone-number">
                                  {el.phone.replace(
                                    /(\d{3})\D?(\d{2})\D?(\d{3})(\d{2})\D?(\d{2})/,
                                    "$1 $2 $3 $4 $5"
                                  )}
                                </span>
                              </div>
                            </div>
                            <span className="found-card--right">
                              {numberToPrice(el.balance)}
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    <div style={{ padding: "24px 16px" }}>
                      <button
                        className="btn add_btn myBtn"
                        onClick={() => {
                          setCardModal(true);
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
      {cardModal && (
        <CardsModal
          getUserData={getUserData}
          setGetUserData={setGetUserData}
          closeModal={() => setCardModal(false)}
          setCardModal={setCardModal}
          setCardData={setCardData}
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
