import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import ReactImageMagnify from "react-image-magnify";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductImageGallery({ data }) {
    const [image, setImage] = useState(data.image);

    useEffect(() => {
        console.log("data.image CAHNGEEE", data.image);
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
    const images = [
        {
            id: 1,
            image: "../images/product_1.png",
        },
        {
            id: 2,
            image: "../images/product_2.png",
        },
        {
            id: 3,
            image: "../images/product_3.png",
        },
        {
            id: 4,
            image: "../images/product_4.jpg",
        },
    ];
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
                    <span className="btn_text">Назад</span>
                </button>
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
                        },
                        enlargedImageContainerDimensions: {
                            width: "212%",
                            height: "155%",
                        },
                    }}
                />
            </div>
            <div className="product_gallery">
                <Carousel
                    className="no-overflow"
                    responsive={responsive}
                    showDots={false}
                    infinite={true}
                    autoPlay={false}
                >
                    {images.map((item) => (
                        <div key={item.id} className="product_item">
                            <button
                                className="btn image_btn"
                                onClick={handleGallery}
                            >
                                <img src={item.image} alt="Product" />
                            </button>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
