import React from "react";
import { Col } from "react-bootstrap";
import useAxios from "../libs/hooks/useAxios";

export default function Banner({ name, size }) {
  const [banner, error] = useAxios(
    `${process.env.BANNER_API_URL}?position=${name}&active=true`
  );

  return (
    banner && (
      <Col lg={size} className="banner">
        <img
          src={banner.data.banners[0].image}
          alt={banner.data.banners[0].title}
        />
      </Col>
    )
  );
}
