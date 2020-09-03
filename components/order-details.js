import { withTranslation } from "../i18n";
import { calcTotalPrice } from "../libs/calcTotalPrice";
import { numberToPrice } from "../libs/numberToPrice";
import { useState } from "react";
import { useRouter } from "next/router";
import EditIcon from "@material-ui/icons/Edit";
import { useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import AlertDialog from "./dialog";

function OrderDetails({ t, data }) {
  const router = useRouter();
  const [editable, setEditable] = useState(() => {
    if (data) {
      return data.status === "in-process" ? true : false;
    }
    return;
  });
  console.log("data :>> ", data);

  const [address, setAddress] = useState(() => (data ? data.address : ""));
  const [inProcess, setInProcess] = useState(() =>
    data ? (data.status === "in-process" ? true : false) : ""
  );

  const [disabled, setDisabled] = useState(true);

  const inputRef = useRef();

  const handleEdit = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current.focus(), 100);
    console.log("inputRef.current", inputRef.current);
  };

  const saveChanges = async () => {
    console.log("saving :>> ");
    const {
      customer_name,
      delivery_method,
      longlat,
      note,
      payment_method,
      phone,
      status,
    } = data;
    try {
      await axios.put(`${process.env.ORDER_API_URL}/${data.number}`, {
        address,
        customer_name,
        delivery_method,
        payment_method,
        longlat,
        note,
        phone,
        status,
      });
      swal(t("success"));
      console.log("saved :>> ");
    } catch (error) {
      swal(t("fail"));
      console.error(error);
    } finally {
      setDisabled(true);
    }
  };

  const cancelOrder = async () => {
    const {
      customer_name,
      delivery_method,
      longlat,
      note,
      payment_method,
      phone,
    } = data;
    try {
      await axios.put(`${process.env.ORDER_API_URL}/${data.number}`, {
        address,
        customer_name,
        delivery_method,
        payment_method,
        longlat,
        note,
        phone,
        status: "cancelled",
      });
      router.push("/order");
    } catch (error) {
      console.error(error);
    }
  };

  return data ? (
    <div className="order_details">
      <div className="header">
        <h3 className="title">{t("order-info")}</h3>
        {inProcess ? (
          <AlertDialog
            title={t("cancel-order")}
            content={t("cancel-order-alert-text")}
            resolve={cancelOrder}
          />
        ) : null}
      </div>
      <div className="delivery_info">
        <div className="delivery_address">
          <h3>{t("delivery-address")}</h3>
          <div className="order_address">
            {inProcess ? (
              <input
                onChange={(e) => setAddress(e.target.value)}
                ref={inputRef}
                type="text"
                value={address}
                disabled={disabled}
              />
            ) : (
              <span>{data.address}</span>
            )}
            {editable && (
              <EditIcon className="edit_order" onClick={handleEdit} />
            )}
          </div>

          {editable ? (
            <button
              disabled={disabled}
              onClick={saveChanges}
              className="btn btn_order"
            >
              {t("save")}
            </button>
          ) : null}
        </div>
        <div className="calculation">
          <div className="price_row">
            <span>{t("subtotal")}</span>
            <span className="price">
              {numberToPrice(calcTotalPrice(data.items))}
            </span>
          </div>
          <div className="price_row">
            <span>{t("discount")}</span>
            <span className="price">0%</span>
          </div>
          <div className="price_row">
            <span>{t("cost-of-delivery")}</span>
            <span className="price">{t("free")}</span>
          </div>
          <div className="price_row">
            <span>{t("total-amount")}</span>
            <span className="price">
              {numberToPrice(calcTotalPrice(data.items))}
            </span>
          </div>
        </div>
      </div>
      <div className="order_table-wrapper">
        <div className="order_details-table">
          <div className="table_container">
            <div className="table_content">
              <table className="order_table">
                <thead>
                  <tr>
                    <th>{t("products")}</th>
                    <th>{t("quantity")}</th>
                    <th>{t("amount")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.product_id}>
                      <td>
                        <span className="item_wrapper">
                          <span className="image_wrapper">
                            <img
                              src={
                                item.image
                                  ? item.image
                                  : "https://sdn.delever.uz/goodzone/6bc0bc84-57a7-4c32-8dd7-421006f5965c"
                              }
                              alt="need image"
                            />
                          </span>
                          <span className="item_details">
                            <span className="item_name">
                              {item.product_name}
                            </span>
                            <span className="item_price">
                              {numberToPrice(item.price)}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td>{item.quantity}</td>
                      <td className="price">
                        <p>{numberToPrice(item.price * item.quantity)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default withTranslation("checkout")(OrderDetails);
