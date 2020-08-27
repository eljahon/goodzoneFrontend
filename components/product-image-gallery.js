import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import ReactImageMagnify from "react-image-magnify";
import { FaArrowLeft } from "react-icons/fa";
import { LazyImage } from "./lazy-image";
import { withTranslation } from "../i18n";
import { useRouter } from "next/router";
import ReactSlick from "react-slick";

function ProductImageGallery({ data, t }) {
  const { gallery } = data;

  const [image, setImage] = useState(data.image);

  const Router = useRouter();

  useEffect(() => {
    setImage(data.image);
  }, [data.image]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const handleGallery = (e) => {
    const imageUrl = e.target.src;

    setImage(imageUrl);
    console.log(e.target.src);
  };
  return (
    <div className="product_preview">
      <div className="back_btn">
        <button className="btn" onClick={() => Router.back()}>
          <span className="btn_icon">
            <FaArrowLeft />
          </span>
          <span className="btn_text">{t("back")}</span>
        </button>
      </div>
      <div className="product_image product_image_mob">
        <ReactSlick
          {...{
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
          }}
        >
          {[data.image, ...gallery].map((item, idx) => (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: data.name,
                  isFluidWidth: true,
                  src: `${item}`,
                },
                largeImage: {
                  src: image,
                  width: 1200,
                  height: 1200,
                },
                enlargedImageContainerStyle: {
                  top: "-27.5%",
                  left: "156.5%",
                  marginLeft: "0",
                  border: "1px solid rgb(241, 241, 241)",
                  backgroundColor: "#fff",
                  zIndex: "101",
                },
                enlargedImageContainerDimensions: {
                  width: "212%",
                  height: "155%",
                },
              }}
            />
          ))}
        </ReactSlick>
      </div>
      <div className="product_image">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: data.name,
              isFluidWidth: true,
              src: `${image}`,
            },
            largeImage: {
              src: image,
              width: 1200,
              height: 1200,
            },
            enlargedImageContainerStyle: {
              top: "-27.5%",
              left: "156.5%",
              marginLeft: "0",
              border: "1px solid rgb(241, 241, 241)",
              backgroundColor: "#fff",
              zIndex: "101",
            },
            enlargedImageContainerDimensions: {
              width: "212%",
              height: "155%",
            },
          }}
        />
      </div>

      {console.log("gallery :>> ", gallery)}
      {gallery ? (
        <div className="product_gallery">
          <Carousel
            className="no-overflow"
            responsive={responsive}
            showDots={false}
            infinite={true}
            autoPlay={false}
          >
            {[data.image, ...gallery].map((item, idx) => (
              <div key={item + idx} className="product_item">
                <button className="btn image_btn" onClick={handleGallery}>
                  <LazyImage src={item} alt="Product" />
                </button>
              </div>
            ))}
          </Carousel>
        </div>
      ) : null}
    </div>
  );
}

export default withTranslation("common")(ProductImageGallery);
