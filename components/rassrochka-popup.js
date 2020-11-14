import React, { useEffect, useRef, useState } from "react";
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

  const monthValue = watch("month");

  const [threshold, setThreshold] = useState(0);
  useEffect(() => {
    const thr = (price * (1 + process.env.PERCENT / 100)) / getValues("month");
    setThreshold(thr);
  }, [monthValue]);

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
                  <div className="input_wrapper--rassrochka input_wrapper--slider">
                    <SliderInput
                      textInputValue={monthValue}
                      register={register}
                      defaultValue="3"
                      name="month"
                      required
                      append={t("month").toLowerCase()}
                      label={t("month")}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="input_wrapper--rassrochka">
                    <Input
                      register={register({
                        required: true,
                        min: threshold,
                        max: price,
                      })}
                      placeholder={t("prepayment-placeholder")}
                      name="prepayment"
                      type="number"
                      append={t("currency")}
                      label={t("prepayment")}
                    />
                    {errors.prepayment?.type === "required" && (
                      <span className="required-error">{t("required")}</span>
                    )}
                    {errors.prepayment?.type === "min" && (
                      <span className="required-error">{`Минимальная сумма предоплаты - ${separateNumber(
                        threshold
                      )} сум.`}</span>
                    )}
                    {errors.prepayment?.type === "max" && (
                      <span className="required-error">{`Мaксимальная сумма предоплаты - ${separateNumber(
                        price
                      )} сум.`}</span>
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
              {tableVisible
                ? !errors.prepayment && (
                    <RassrochkaTable
                      price={price}
                      month={getValues("month")}
                      prepayment={getValues("prepayment")}
                    />
                  )
                : null}
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withTranslation("common")(RassrochkaPopup);
