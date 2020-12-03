import { Carousel } from "react-bootstrap";

export default function HomeSplash({ banners }) {
  return (
    <section className="home_splash">
      <Carousel>
        {banners?.banners?.map((item, i) => (
          <Carousel.Item key={i}>
            <a href={item.url} className={item.url ? "" : "link_disabled"}>
              <img
                className="carousel-img"
                src={item.image}
                alt="Goodzone gifts"
              />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}
