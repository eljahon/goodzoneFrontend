import Footer from "../../components/footer";
import { Container } from "react-bootstrap";
import { useTranslation } from "../../i18n";
import { withStyles } from "@material-ui/core/styles";
import { NativeSelect } from "@material-ui/core";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import InputBase from "@material-ui/core/InputBase";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { shallowEqual, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function Review({ shops, categories }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  console.log("shop", user);
  const { t } = useTranslation();
  const handleClose = () => setClose(false);
  const router = useRouter();
  const [close, setClose] = useState(false);
  const { register, handleSubmit, errors, watch, control } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const modalhandleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "#fff",
      border: "1px solid #ced4da",
      fontSize: 16,

      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      padding: "15px 26px 15px 12px!important",
      "&:focus": {
        backgroundColor: "#fff",
        borderRadius: 4,
        borderColor: "#f5363e",
        boxShadow: "none",
      },
    },
  }))(InputBase);

  const onSubmit = async (data) => {
    setDisabled(true);
    console.log("info===>", data);
    try {
      const response = await axios.post(process.env.REVIEW_API_URL, {
        ...data,
        phone: data.phone,
        shop: data.shop.replaceAll("<p>", "").replaceAll("</p>", ""),
      });
      if (response.status === 201) {
        setDisabled(false);
        router.push("/");
        handleShow(true);
      }
    } catch (error) {
      setDisabled(false);
    }
  };

  return (
    <div className="review__body">
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="review__modal"
        show={show}
        onHide={modalhandleClose}
      >
        <Modal.Header className="review__modal-header">
          <img
            src="/Group 56375.png"
            alt="tgt"
            centered
            className="review__img"
          />
        </Modal.Header>
        <Modal.Body className="review__modal-body">{t("gangra")}</Modal.Body>
        <Modal.Body className="review__modal-body">{t("gangra2")}</Modal.Body>
        <Button
          className="review__modal-btn"
          onClick={modalhandleClose}
          size="lg"
          centered
        >
          {t("close")}
        </Button>
      </Modal>
      <Container>
        <form className="checkout_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout_form-box">
            <h3 className="review__box-title">{t("myIdea")}</h3>
            <p className="review__box-txt">{t("reviewTxt")}</p>
          </div>
          <div className="checkout_form-box">
            <h3 className="form_heading">{t("full-name")}</h3>
            <div className="field_wrapper">
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder={t("write-name")}
                defaultValue={user ? `${user.lastname} ${user.name}` : ""}
                ref={register}
              />
            </div>
          </div>
          <div className="checkout_form-box">
            <h3 className="form_heading">{t("email-address")}</h3>
            <div className="field_wrapper">
              <input
                type="email"
                name="email"
                id="email"
                placeholder={t("write-email-address")}
                ref={register}
              />
            </div>
          </div>
          <div className="checkout_form-box">
            <h3 className="form_heading">{t("phone-number")}</h3>
            <div className="field_wrapper">
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                placeholder={t("write-phone-number")}
                defaultValue={user ? `${user.phone}` : ""}
                ref={register}
              />
            </div>
          </div>
          <div className="checkout_form-box">
            <h3 className="form_heading">{t("area-title")}</h3>
            <div className="field_wrapper">
              {shops.shops.length && (
                <NativeSelect
                  input={<BootstrapInput />}
                  inputProps={{
                    inputRef: (ref) => {
                      if (!ref) return;
                      register({
                        name: "shop",
                        value: ref.value,
                      });
                    },
                  }}
                  defaultValue={t("goodzoneShop")}
                >
                  <option value={t("goodzoneShop")}>{t("goodzoneShop")}</option>
                  {shops.shops.map((item, i) => (
                    <option key={i} value={item.name}>
                      {item?.name.replaceAll("<p>", "").replaceAll("</p>", "")}
                    </option>
                  ))}
                </NativeSelect>
              )}
            </div>
          </div>
          <div className="checkout_form-box">
            <h3 className="form_heading">{t("offerType")}</h3>
            <div className="field_wrapper">
              <NativeSelect
                inputProps={{
                  inputRef: (ref) => {
                    if (!ref) return;
                    register({
                      name: "theme",
                      value: ref.value,
                    });
                  },
                }}
                input={<BootstrapInput />}
                defaultValue={t("thaksFor")}
              >
                <option value={t("thaksFor")}>{t("thaksFor")}</option>
                <option value={t("deliveryFor")}>{t("deliveryFor")}</option>
                <option value={t("deffective")}>{t("deffective")}</option>
                <option value={t("service")}>{t("service")}</option>
                <option value={t("idea")}>{t("idea")}</option>
              </NativeSelect>
            </div>
          </div>
          <div className="checkout_form-box">
            <h3 className="form_heading">{t("komment")}</h3>
            <div className="field_wrapper">
              <textarea
                type="text"
                name="description"
                id="description"
                required
                placeholder={t("kommentAdd")}
                ref={register}
              />
            </div>
            <div className="checkout_submit">
              <button
                className="btn"
                disabled={disabled}
                onClick={handleClose}
                onClick={handleClose}
              >
                <span className="btn_text">{t("send")}</span>
              </button>
            </div>
          </div>
        </form>
      </Container>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const urls = [
    `${process.env.SHOPS_API_URL}`,
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
  ];

  const [shops, categories] = await fetchMultipleUrls(urls);

  return {
    props: {
      shops,
      categories,
    },
  };
}
