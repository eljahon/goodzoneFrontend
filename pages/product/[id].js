import React, { useState, useEffect, useRef } from "react";
import { Tabs, Tab, Breadcrumb, Badge, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  FaShoppingBag,
  FaCircle,
  FaBoxOpen,
  FaStore,
  FaCommentAlt,
  FaArrowDown,
} from "react-icons/fa";
import SEO from "../../components/seo";
import Footer from "../../components/footer";
import CartPopup from "../../components/cart-popup";
import { asyncAddToCartAction } from "../../redux/actions/cartActions/cartActions";
import { numberToPrice } from "../../libs/numberToPrice";
import { fetchMultipleUrls } from "../../libs/fetchMultipleUrls";
import RelatedProducts from "../../components/related-products";
import ProductImageGallery from "../../components/product-image-gallery";
import { withTranslation } from "../../i18n";
import UniredPopup from "../../components/unired-popup";
import axios from "axios";
import { getLocaleDate } from "../../libs/getLocaleDate";
import Rating from "@material-ui/lab/Rating";
import UserAvatar from "react-user-avatar";
import { useForm } from "react-hook-form";

function Product({ product: data, t, shops }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const [uniredPopup, setUniredPopup] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const addToCartHandler = (event) => {
    const button = event.target;
    const cartItem = button.querySelector(".cart-item");
    const pointCartItemX = cartItem.getBoundingClientRect().x;
    const pointCartItemY = cartItem.getBoundingClientRect().y;
    const cartButton = document.getElementById("cartButton");
    const pointCartButtonX = cartButton.getBoundingClientRect().x;
    const pointCartButtonY = cartButton.getBoundingClientRect().y;
    const translateX = pointCartButtonX - pointCartItemX + "px";
    const translateY = pointCartButtonY - pointCartItemY + "px";
    cartItem.style.visibility = "visible";
    button.style.pointerEvents = "none";
    setTimeout(() => {
      cartItem.style.transform = `translate(${translateX}, ${translateY}) scale(0.3)`;
      cartItem.style.opacity = "0.7";
    }, 200);
    setTimeout(() => {
      dispatch(asyncAddToCartAction(data));
      cartButton.classList.add("shake");
      cartItem.style.visibility = "hidden";
    }, 1000);
    setTimeout(() => {
      cartButton.classList.remove("shake");
    }, 1500);
    setTimeout(() => {
      cartItem.style.transform = `translate(0, 0) scale(1)`;
      cartItem.style.opacity = "1";
      button.style.pointerEvents = "all";
    }, 2000);
  };
  // reviews
  const reviewForm = useRef(null);
  const [reviewsAdded, setReviewsAdded] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(null);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.FEEDBACK_API_URL}?product=${data.slug}&limit=${limit}`
      )
      .then((res) => {
        const {
          data: { feedbacks, count },
        } = res;
        setCount(count);
        setReviews(feedbacks);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [reviewsAdded, limit, data]);

  const { register, handleSubmit, errors } = useForm();
  console.log("user", user);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      console.log("formData :>> ", formData);
      const response = await axios.post(
        `${process.env.FEEDBACK_API_URL}/${data.slug}`,
        {
          active: true,
          comment: formData.comment || "",
          customer_name: user
            ? `${user.name} ${user.lastname}`
            : formData.username,
          customer_id: user ? user.id : "",
          rate: rating || 5,
        }
      );

      console.log("response from review post", response.data);
      setReviewsAdded((prev) => prev + 1);
      // reviewForm.current.style.display = "none";
      reviewForm.current.reset();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("reviewsAdded", reviewsAdded);

  return (
    <>
      <SEO
        title={data.meta.title || data.name}
        description={
          data.meta.description ||
          data.preview_text.replace(/(<([^>]+)>)/gi, "")
        }
        image={data.image}
        keywords={data.meta.tags}
      />
      <div className="product_wrapper">
        <div className="product_container">
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => router.push("/")}>
              {t("main")}
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() =>
                router.push(`/category/[id]`, `/category/${data.category.slug}`)
              }
            >
              {data.category.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{data.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="product_details-wrapper">
            <ProductImageGallery data={data} />
            <div className="product_info">
              <h1>{data.name}</h1>
              {data.price.old_price > data.price.price ? (
                <Badge variant="secondary">
                  {numberToPrice(data.price.old_price)}
                </Badge>
              ) : (
                ""
              )}
              <div className="product_desc-wrapper">
                {data.preview_text ? (
                  <p
                    className="product_desc"
                    dangerouslySetInnerHTML={{
                      __html: data.preview_text,
                    }}
                  ></p>
                ) : data.brand.image ? (
                  <img
                    src={data.brand.image}
                    alt={data.name}
                    className="brand_image"
                  />
                ) : (
                  ""
                )}
                <Link href="#details">
                  <a className="product_desc-link">{t("about-product")}</a>
                </Link>
              </div>
              <div className="product_cart-wrapper">
                <div className="product_price">
                  {numberToPrice(data.price.price)}
                </div>
                <div className="product_cart-btn">
                  <button
                    className="btn cart_btn"
                    onClick={(e) => addToCartHandler(e)}
                  >
                    <span className="btn_icon">
                      <FaShoppingBag />
                    </span>
                    <span className="btn_text">{t("add-to-cart")}</span>
                    <span className="cart-item">
                      <img src={data.image} alt={data.name} />
                    </span>
                  </button>
                  {data.prices[0].price != 0 ? (
                    <button
                      className="btn cart_btn btn_unired"
                      onClick={() => setUniredPopup(true)}
                    >
                      <span className="btn_text">
                        {t("calculate-by-unired")}
                      </span>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {uniredPopup ? (
                <UniredPopup
                  closePopup={() => setUniredPopup(false)}
                  data={data}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="details_container" id="details">
            <Tabs defaultActiveKey="about">
              <Tab
                eventKey="about"
                title={
                  <span>
                    <FaBoxOpen /> {t("about-product")}
                  </span>
                }
              >
                {data.description ? (
                  <div
                    className="details_wrapper"
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  ></div>
                ) : (
                  ""
                )}
              </Tab>
              <Tab
                eventKey="store"
                title={
                  <span>
                    <FaStore /> {t("availability-in-stores")}
                  </span>
                }
              >
                <div className="details_wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>{t("shop")}</th>
                        <th>{t("address")}</th>
                        <th>{t("operating-mode")}</th>
                        <th>{t("availibility-in-store")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shops.map((item) => (
                        <tr key={item.shop.id}>
                          <td>{item.shop.name}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: item.shop.address,
                            }}
                          />
                          <td>{item.shop.working_hours}</td>
                          <td>
                            <span
                              className={`td_icon ${
                                item.quantity == 0
                                  ? "secondary"
                                  : item.quantity < 6
                                  ? "danger"
                                  : item.quantity < 11
                                  ? "warning"
                                  : "success"
                              }`}
                            >
                              <FaCircle />
                              {item.quantity == 0
                                ? t("not")
                                : item.quantity < 6
                                ? t("few")
                                : item.quantity < 11
                                ? t("enough")
                                : t("lot")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Tab>

              <Tab
                eventKey="reviews"
                title={
                  <span>
                    <FaCommentAlt /> {t("reviews")}
                  </span>
                }
              >
                <form
                  ref={reviewForm}
                  className="review_form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form_controls">
                    {user && (
                      <UserAvatar
                        size="50"
                        name={`${user.name} ${user.lastname}`}
                      />
                    )}
                    <div className="form_inputs">
                      <div>
                        <Rating
                          onChange={(e, newValue) => setRating(newValue)}
                          value={rating}
                        />
                      </div>
                      {user ? null : (
                        <input
                          ref={register}
                          type="text"
                          name="username"
                          placeholder={t("enter-name")}
                          required
                        />
                      )}
                      <textarea
                        ref={register}
                        name="comment"
                        id="comment"
                        cols="30"
                        rows="10"
                        placeholder={t("leave-comment")}
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn btn_submit" style={{marginTop: "1rem"}}>
                    {loading ? (
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    ) : (
                      t("comment")
                    )}
                  </button>
                </form>
                {console.log("reviews :>> ", reviews)}
                {reviews &&
                  reviews.map((review) => (
                    <div className="review" key={review.id}>
                      <div className="review_header">
                        <div className="review_userDetails">
                          <div className="review_avatar">
                            <UserAvatar
                              size="50"
                              name={`${review.customer_name
                                .split(" ")[0]
                                .toUpperCase()} ${
                                review.customer_name
                                  .split(" ")[1]
                                  ?.toUpperCase() || ""
                              }`}
                            />
                          </div>
                          <div className="review_content">
                            <div className="rating">
                              <span className="name">
                                {review.customer_name}
                              </span>
                              <Rating
                                name="read-only"
                                value={Number(review.rate)}
                                readOnly
                                size="small"
                              />
                            </div>
                            <p className="date">
                              {getLocaleDate(review.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="review_comment">{review.comment}</div>
                    </div>
                  ))}
                {loading && (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
                {(limit <= count) & !loading ? (
                  <button
                    className="btn btn_submit"
                    onClick={() => {
                      setLimit((l) => l + 10);
                    }}
                  >
                    {t("load-more")}
                  </button>
                ) : null}
              </Tab>
            </Tabs>
          </div>
          <RelatedProducts products={data.related_products} />
        </div>
      </div>

      <CartPopup />
      <Footer />
    </>
  );
}

export default withTranslation("common")(Product);

export async function getServerSideProps({ params, req }) {
  const urls = [
    `${process.env.PRODUCT_API_URL}/${params.id}?lang=${req.i18n.language}`,
    `${process.env.PRODUCT_API_URL}/${params.id}/shops?lang=${req.i18n.language}`,
  ];

  const [{ product }, { shops }] = await fetchMultipleUrls(urls);

  return {
    props: {
      product,
      shops,
    },
  };
}
