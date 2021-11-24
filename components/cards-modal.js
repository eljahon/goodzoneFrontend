import React, { useEffect, useState, useRef } from "react";
import { withTranslation } from "../i18n";
import axios from "axios";
import { createFormData } from "../libs/createFormData";
import { CardInput, PhoneInput } from "./MyInput";
import { useSelector } from "react-redux";
import Timer from "./Timer";

function CardsModal({
  closeModal,
  t,
  setCardModal,
  setGetUserData,
  getUserData,
  setCardData,
}) {
  const [load, setLoad] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [sendSmsCode, setSendSmsCode] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [count, setCount] = useState(10);

  function TimerFunc() {
    axios
      .get(process.env.COSTUMER_CARD_GET_API_URL, {
        params: {
          number: getUserData.number.replace(/ /g, "").replace(/_/g, ""),
          phone: getUserData.phone.replace(/ /g, ""),
        },
      })
      .then((res) => {
        setCount(10);
        sendCode();
      })
      .catch((err) => setStepNumber(2));
  }

  useEffect(() => {
    setLoad(true);
    document.body.classList.add("overflow");
    return () => {
      setLoad(false);
      document.body.classList.remove("overflow");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCardModal(false);
  };

  const wrapperRef = useRef(null);
  useOutsideCloseMenu(wrapperRef);

  function useOutsideCloseMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const isSendSms = () =>
    axios
      .post(
        process.env.COSTUMER_CARD_CHECK_USER_API_URL,
        createFormData({
          code: sendSmsCode,
          phone: getUserData.phone.split(" ").join(""),
        })
      )
      .then((res) => {
        setStepNumber(3);
        setCardData(res.data.customer_card);
      })
      .catch((err) => {
        if (err.response.status === 404 || err.response.status === 500) {
          setStepNumber(2);
        }
      });

  const smsCodeFunc = (e) => {
    e.preventDefault();
    if (sendSmsCode !== "") {
      isSendSms();
    }
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    axios
      .get(process.env.COSTUMER_CARD_GET_API_URL, {
        params: {
          number: getUserData.number.replace(/ /g, "").replace(/_/g, ""),
          phone: getUserData.phone.replace(/ /g, ""),
        },
      })
      .then((res) => {
        setStepNumber(1);
        sendCode();
      })
      .catch((err) => setStepNumber(2));
  };

  function sendCode() {
    axios
      .get(`${process.env.COSTUMER_CARD_GET_API_SEND_CODE_URL}`, {
        params: {
          user_id: user.id,
          phone: getUserData.phone.split(" ").join(""),
        },
      })
      .then((res) => {
      })
      .catch((err) => setStepNumber(2));
  }

  return (
    <div className="login_modal-wrapper">
      <div
        className={`cards_modal-holder ${load ? "show" : ""}`}
        ref={wrapperRef}
      >
        {stepNumber === 0 && (
          <div className="inner_block">
            <div className="auth_form address_form">
              <div className="auth_form-container address_container">
                <div className="header_holder-block">
                  <h3 className="header_holder-block-title">
                    {t("add-new-card")}
                  </h3>
                  <button
                    className="header_holder-block-close-button"
                    onClick={closeModal}
                  >
                    x
                  </button>
                </div>

                <form onSubmit={handleSubmitData}>
                  <label htmlFor="cardNumber" className="form-label">
                    {t("card-number")}
                  </label>
                  <CardInput
                    id="cardNumber"
                    name="card_number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    onChange={(e) => {
                      setGetUserData({
                        ...getUserData,
                        number: e.target.value,
                      });
                    }}
                  />

                  <label htmlFor="cardPhone" className="form-label">
                    {t("cell-phone")}
                  </label>
                  <PhoneInput
                    type="text"
                    id="cardPhone"
                    name="phone"
                    onChange={(e) => {
                      setGetUserData({
                        ...getUserData,
                        phone: e.target.value,
                      });
                    }}
                    placeholder={t("phone-number")}
                  />

                  <button type="submit" className="btn btn_submit">
                    {t("get-code")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {stepNumber === 1 && (
          <div className="inner_block">
            <div className="auth_form address_form">
              <div className="auth_form-container address_container">
                <div className="header_holder-block">
                  <h3>{t("add-new-card")}</h3>
                  <button className="header_holder-block-close-button" onClick={closeModal}>x</button>
                </div>

                <form onSubmit={smsCodeFunc}>
                  <label htmlFor="cardNumber" className="form-label">
                    {t("sms-code")}
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="sms-code"
                    onChange={(e) => setSendSmsCode(e.target.value)}
                    placeholder={t("code")}
                    required
                  />
                  <div 
                  className="sms-code-modal-wrapper"
                  >
                    <span>
                      {!count ? (
                        <button className="sms-code-modal-wrapper__button" type="button" onClick={TimerFunc}>
                        {t("resend")}

                        </button>
                      ) : (
                        t("sms-sent")
                      )}
                    </span>
                    <span>
                      <Timer count={count} setCount={setCount} />
                    </span>
                  </div>

                  <button type="submit" className="btn btn_submit">
                    {t("save-cards")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {stepNumber === 2 && (
          <div className="inner_block">
            <div className="auth_form address_form">
              <div className="auth_form-container address_container">
                <div className="header_holder-block">
                  <span></span>
                  <button
                    className="header_holder-block-close-button"
                    onClick={closeModal}
                  >
                    x
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div
                    className="card_body"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src="../images/undov.png"
                        alt="Purse"
                        className="found-card--left__logo"

                        
                      />
                      <span
                      className="found-card--center__title"
                      
                        
                      >
                        {t("oshibka")}{" "}
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn_submit"
                    style={{ marginTop: "50px" }}
                  >
                    {t("back-to-main")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {stepNumber === 3 && (
          <div className="inner_block">
            <div className="auth_form address_form">
              <div className="auth_form-container address_container">
                <div className="header_holder-block">
                  <span></span>

                  <button
                    className="header_holder-block-close-button"
                    onClick={closeModal}
                  >
                    x
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div
                    className="card_body"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src="../images/checked.png"
                        alt="Purse"
                        className="found-card--left__logo"
                        
                      />
                      <span
                      className="found-card--center__title"
                       
                      >
                        {t("registered-card")}{" "}
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn_submit"
                    style={{ marginTop: "50px" }}
                  >
                    {t("back-to-main")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default withTranslation("common")(CardsModal);
