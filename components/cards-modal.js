import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { withTranslation } from "../i18n";
import { axiosAuth } from "../libs/axios/axios-instances";
import axios from "axios";
import { createFormData } from "../libs/createFormData";
import { getLocalStorage } from "../libs/localStorage";
import { Telegram } from "@material-ui/icons";
import { CardInput, PhoneInput, InvalidInput } from "./MyInput";
import { useSelector } from "react-redux";

function CardsModal({
  closeModal,
  address,
  onSubmit,
  t,
  setAddress,
  setOpen,
  editAddressModal,
  setGetUserData,
  getUserData,
  setCardData,
}) {
  const [load, setLoad] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [inputData, setInputData] = useState("");
  const [sendSmsCode, setSendSmsCode] = useState("");
  const { register } = useForm();
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
  });
  const user = useSelector((state) => state.auth.user);

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
    setOpen(true);
    editAddressModal(false);
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

  // const normalizeCardNumber = (value) => {
  //   return value.replace(/\s/g, "").match(/.{1.4}/g)?.join("   ").substr(0, 19) || ""
  // }
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
        console.log("code===>", res);
        setStepNumber(3);
        setCardData(res.data.customer_card);
      })
      .catch((err) => {
        console.log("err==> ", err);
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
        console.log("resssssssssssssssss", res);
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
        console.log("send_code======>", res);
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
                  <h3
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "22px",
                      letterSpacing: "0.01em",
                      color: " #000000",
                    }}
                  >
                    {t("add-new-card")}
                  </h3>
                  <button
                    style={{
                      marginBottom: "10px",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "21px",
                      fontWeight: 700,
                    }}
                    onClick={closeModal}
                  >
                    x
                  </button>
                </div>

                <form onSubmit={handleSubmitData}>
                  <label
                    htmlFor="cardNumber"
                    style={{ textAlign: "start", display: "block" }}
                  >
                    {t("card-number")}
                  </label>
                  {/* <input
                    type="tel"
                    id="cardNumber"
                    name="card_number"
                    inputMode = "numeric"
                    autoComplete = "cc-number"
                    onChange={(e) => {
                      // const {value} = e.target
                      // event.target.value = normalizeCardNumber(value)
                      setGetUserData({
                        ...getUserData,
                        number: e.target.value,
                      })
                      
                      // if (e.target.value.length ===  16) {
                        //   getUserData(e.target.value);
                        // }
                      }}
                      // ref = {register}
                    placeholder="0000 0000 0000 0000"
                    required
                  /> */}
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

                      // if (e.target.value.length ===  16) {
                      //   getUserData(e.target.value);
                      // }
                    }}
                  />

                  <label
                    htmlFor="cardPhone"
                    style={{ textAlign: "start", display: "block" }}
                  >
                    {t("cell-phone")}
                  </label>

                  {/* <input
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
                    required  
                  /> */}
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
                  <h3
                    style={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "22px",
                      letterSpacing: "0.01em",
                      color: " #000000",
                    }}
                  >
                    {t("add-new-card")}
                  </h3>
                  <button
                    style={{
                      marginBottom: "10px",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "21px",
                      fontWeight: 700,
                    }}
                    onClick={closeModal}
                  >
                    x
                  </button>
                </div>

                <form onSubmit={smsCodeFunc}>
                  <label
                    htmlFor="cardNumber"
                    style={{ textAlign: "start", display: "block" }}
                  >
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
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <span> {t("sms-sent")}</span>
                    <span>02:00</span>
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
                    style={{
                      marginBottom: "10px",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "21px",
                      fontWeight: 700,
                    }}
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
                    style={{
                      marginBottom: "10px",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "21px",
                      fontWeight: 700,
                    }}
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
