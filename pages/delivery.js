import SEO from "../components/seo";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { LazyImage } from "../components/lazy-image";
import axios from "axios";

export default function Delivery() {
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    useEffect(() => {
        axios
            .get(`${process.env.PAGE_API_URL}/dostavka`)
            .then((response) => {
                setDeliveryInfo(response.data.page);
            })
            .catch((error) => {
                console.log("error " + error);
            });
    }, []);

    return (
        deliveryInfo && (
            <>
                <SEO
                    title={deliveryInfo.meta.title || deliveryInfo.title}
                    description={
                        deliveryInfo.meta.description ||
                        deliveryInfo.description.replace(/(<([^>]+)>)/gi, "")
                    }
                    keywords={deliveryInfo.meta.tags}
                />
                <div className="delivery_splash">
                    {deliveryInfo.preview_image ? (
                        <LazyImage
                            src={deliveryInfo.preview_image}
                            alt="Goodzone delivery"
                        />
                    ) : (
                        ""
                    )}
                </div>
                <section className="section_container">
                    <article className="delivery_content">
                        <div
                            className="content_block"
                            dangerouslySetInnerHTML={{
                                __html: deliveryInfo.content,
                            }}
                        ></div>
                    </article>
                </section>
                <Footer />
            </>
        )
    );
}
