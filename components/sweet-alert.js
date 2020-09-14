import React, { useState } from "react";
import { withTranslation } from "../i18n";


const SweetAlert = ({
  t, closeModal, setNoReg
}) => {

  return (
    <div className="auth_form">
      <h5 className="p-3 bg-danger text-white text-left">{t("reject-register")}</h5>
      <h6 className="py-2">{t("reject-text-register")}</h6>
      <div className="py-4 px-2 d-flex justify-content-end">
        <button className="btn btn-danger mx-2" onClick={() => closeModal()}>
          {t("yes")}
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => setNoReg(false)}>
          {t("not")}
        </button>
      </div>
    </div>
  );
};

export default withTranslation("common")(SweetAlert);
