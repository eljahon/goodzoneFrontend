import React, { useEffect, useState } from "react";
import { FaTimes, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import IconPhone from "./icons/IconPhone";

export default function BranchInfo({ data, closeInfo }) {
  const [info, setInfo] = useState(false);
  useEffect(() => {
    setInfo(true);
  });
  return (
    <div className={`branch_info ${info ? "show" : ""}`}>
      <button className="btn btn_close" onClick={closeInfo}>
        <FaTimes />
      </button>
      <div className="branch_info-content">
        <div className="branch_image">
          <img src={data.image} alt={data.name} />
        </div>
        <div className="branch_info-body">
          <h3>{data.name}</h3>
          <div className="info_block">
            <span className="title">
              <span className="icon">
                <FaMapMarkerAlt />
              </span>
              <span className="text">Адрес:</span>
            </span>
            <span className="desc">{data.address}</span>
            <span className="desc">Ориентир: {data.address2}</span>
          </div>
          <div className="info_block">
            <span className="title">
              <span className="icon">
                <FaClock />
              </span>
              <span className="text">Часы работы:</span>
            </span>
            <span className="desc">{data.working_hours}</span>
          </div>
          <div className="info_block">
            <span className="title">
              <IconPhone />
              <span className="text">Телефоны:</span>
            </span>
            <span className="desc">{data.phone}</span>
          </div>
          <div className="info_block mobile">
            <button className="btn" onClick={closeInfo}>
              Показать на карте
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
