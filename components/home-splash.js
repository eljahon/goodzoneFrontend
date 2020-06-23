import { Carousel } from "react-bootstrap";

export default function HomeSplash() {
    return(
        <section className="home_splash">
            <Carousel>
                <Carousel.Item>
                    <img src="images/carousel_1.png" alt="Goodzone gifts"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="images/carousel_2.jpg" alt="Goodzone gifts"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="images/carousel_3.png" alt="Goodzone gifts"/>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="images/carousel_4.webp" alt="Goodzone gifts"/>
                </Carousel.Item>
            </Carousel>
        </section>
    )
}