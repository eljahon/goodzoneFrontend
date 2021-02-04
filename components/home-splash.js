import { Carousel } from 'react-bootstrap'
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
function HomeSplash({ banners }) {
  return (
    <section className='home_splash'>
      <Carousel>
        {banners?.banners?.map((item, i) => (
          <Carousel.Item key={i}>
            <a href={item.url} className={item.url ? '' : 'link_disabled'}>
              <LazyLoadImage
                className='carousel-img'
                src={item.image}
                alt='Goodzone gifts'
                effect='blur'
              />
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  )
}
export default trackWindowScroll(HomeSplash)
