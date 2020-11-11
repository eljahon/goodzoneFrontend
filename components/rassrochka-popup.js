import React, { useRef, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { withTranslation } from "../i18n";
import { separateNumber } from "../libs/numberToPrice";
import Input from "./input";
import SliderInput from "./slider-input";
import RassrochkaTable from "./table";

const RassrochkaPopup = ({ t, price, setRassrochkaPopup, rassrochkaPopup }) => {
  const { register, handleSubmit, errors, watch, getValues } = useForm();
  const [tableVisible, setTableVisible] = useState(false);
  const tableRef = useRef();

  console.log("errors", errors);

  const calculate = (values) => {
    setTableVisible(true);
    tableRef.current.scrollIntoView();
  };

  const sliderValue = watch("month");

  return (
    <div className="rassrochka-popup">
      <Modal
        size="lg"
        centered
        show={rassrochkaPopup}
        onHide={() => setRassrochkaPopup(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("calculate-by-rassrochka")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <form style={{ width: "100%" }}>
              <Row>
                <Col xs={12} md={6}>
                  <div className="input_wrapper--rassrochka">
                    <Input
                      register={register}
                      name="price"
                      defaultValue={separateNumber(price)}
                      disabled
                      required
                      append={t("currency")}
                      label={t("price")}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="input_wrapper--rassrochka">
                    <Input
                      register={register}
                      defaultValue="20"
                      name="percent"
                      disabled
                      required
                      append="%"
                      label={t("percent")}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="input_wrapper--rassrochka input_wrapper--slider">
                    <SliderInput
                      textInputValue={sliderValue}
                      register={register}
                      defaultValue="3"
                      name="month"
                      required
                      append={t("month")}
                      label={t("month")}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="input_wrapper--rassrochka">
                    <Input
                      register={register({ required: true })}
                      placeholder={t("prepayment-placeholder")}
                      name="prepayment"
                      type="number"
                      append={t("currency")}
                      label={t("prepayment")}
                    />
                    {errors.prepayment && (
                      <span className="required-error">{t("required")}</span>
                    )}
                  </div>
                </Col>
              </Row>
            </form>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button
            style={{ textAlign: "center", width: "40%" }}
            variant="danger"
            onClick={handleSubmit(calculate)}
          >
            {t("calculate")}
          </Button>
        </Modal.Footer>
        <Modal.Body className="show-grid">
          <Container>
            <div ref={tableRef}>
              {tableVisible ? (
                <RassrochkaTable
                  price={price}
                  percent={getValues("percent")}
                  month={getValues("month")}
                  prepayment={getValues("prepayment")}
                />
              ) : null}
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withTranslation("common")(RassrochkaPopup);
