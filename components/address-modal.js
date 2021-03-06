import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { withTranslation } from "../i18n";

function AddressModal({ closeModal, address, onSubmit, t }) {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    document.body.classList.add("overflow");
    return () => {
      setLoad(false);
      document.body.classList.remove("overflow");
    };
  }, []);

  const { register, handleSubmit, errors } = useForm();

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

  return (
    <div className="login_modal-wrapper">
      <button className="btn close_btn" onClick={closeModal}>
        <FaTimes />
      </button>
      <div
        className={`login_modal-holder ${load ? "show" : ""}`}
        ref={wrapperRef}
      >
        <button className="btn close_btn" onClick={closeModal}>
          <FaTimes />
        </button>
        <div className="inner_block">
          <div className="auth_form address_form">
            <div className="auth_form-container address_container">
              <h3>{t("edit-address")}</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  name="title"
                  type="hidden"
                  placeholder="Enter title"
                  required
                />
                <textarea
                  ref={register}
                  name="address"
                  id="address"
                  cols="30"
                  rows="10"
                  defaultValue={address ? address : ""}
                  placeholder={t("address")}
                  required
                ></textarea>
                <button type="submit" className="btn btn_submit">
                  {t("save-address")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withTranslation("common")(AddressModal);
