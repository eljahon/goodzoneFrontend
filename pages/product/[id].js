import React, { useState, useEffect, useRef } from "react";
import { Tabs, Tab, Breadcrumb, Badge, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import CommentIcon from "../../components/comment-icon";

import {
  FaShoppingBag,
  FaCircle,
  FaBoxOpen,
  FaStore,
  FaCommentAlt,
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
import { createFormData } from "../../libs/createFormData";
import RassrochkaPopup from "../../components/rassrochka-popup";

function Product({ product: data, t, shops }) {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const [uniredPopup, setUniredPopup] = useState(false);
  const [rassrochkaPopup, setRassrochkaPopup] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const availabileInStore = !!shops.reduce((acc, shop) => {
    acc += shop.quantity;
    return acc;
  }, 0);

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
  const [errorText, setErrorText] = useState("");
  const [reviews, setReviews] = useState(null);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(0);
  const [elements, setElement] = useState("about");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.FEEDBACK_API_URL}?product=${data.slug}&limit=${limit}&active=true`
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

  const onSubmit = async (formData) => {
    if (rating == 0) {
      setErrorText(t("comment-condition"));
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.FEEDBACK_API_URL}/${data.slug}`,
        createFormData({
          active: true,
          comment: formData.comment || "",
          customer_name: user
            ? `${user.name} ${user.lastname}`
            : formData.username,
          customer_id: user ? user.id : "",
          rate: rating,
        })
      );

      setReviewsAdded((prev) => prev + 1);

      reviewForm.current.reset();
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  const ctaButtonsRef = useRef();
  const ctaButtonsWidth =
    ctaButtonsRef.current &&
    [...ctaButtonsRef.current.childNodes].reduce(
      (t, c) => t + c.offsetWidth,
      0
    );
  const rassrochkaBtnStyle = {
    width: `${ctaButtonsWidth + 15}px`,
  };

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
                router.push(`/shop/[id]`, `/shop/${data.category.slug}`)
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
                ) : (
                  ""
                )}{" "}
                {data.brand.image ? (
                  <img
                    src={data.brand.image}
                    alt={data.name}
                    className="brand_image"
                  />
                ) : (
                  ""
                )}
                <div className="d-flex align-items-center mb-2">
                  <Rating
                    name="read-only"
                    value={data.average_rate ? data.average_rate : 0}
                    readOnly
                    size="large"
                  />
                  <span className="ml-3">
                    <a
                      className="logo"
                      href="#details"
                      onClick={() => {
                        setElement("reviews");
                      }}
                    >
                      <span className="mr-1">
                        <CommentIcon />
                      </span>
                    </a>
                    <small className="text-secondary">
                      (
                      {data.reviews_count == 0
                        ? t("comment-count")
                        : data.reviews_count}
                      )
                    </small>
                  </span>
                </div>
                <Link href="#details">
                  <a
                    className="product_desc-link"
                    onClick={() => {
                      setElement("about");
                    }}
                  >
                    {t("about-product")}
                  </a>
                </Link>
              </div>
              <div className="product_cart-wrapper">
                <span className="product_price">
                  {numberToPrice(data.price.price)}
                </span>
                {availabileInStore ? (
                  <span className="product_availability product_availability--true">
                    {t("available")}
                  </span>
                ) : (
                  <span className="product_availability product_availability--false">
                    {t("not-available")}
                  </span>
                )}
                <div ref={ctaButtonsRef} className="product_cart-btn">
                  <button
                    disabled={!availabileInStore}
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
                      disabled={!availabileInStore}
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
                {/* <div className="product_cart-btn">
                  <button
                    disabled={!availabileInStore}
                    className="btn cart_btn btn_rassrochka"
                    onClick={() => setRassrochkaPopup(true)}
                    style={rassrochkaBtnStyle}
                  >rassr
                    <span className="btn_text">
                      {t("calculate-by-rassrochka")}
                    </span>
                  </button>
                </div> */}
              </div>
              {uniredPopup ? (
                <UniredPopup
                  closePopup={() => setUniredPopup(false)}
                  data={data}
                />
              ) : (
                ""
              )}
              {rassrochkaPopup ? (
                <RassrochkaPopup
                  price={data.price.price}
                  rassrochkaPopup={rassrochkaPopup}
                  setRassrochkaPopup={setRassrochkaPopup}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="details_container" id="details">
            <Tabs activeKey={elements} onSelect={(k) => setElement(k)}>
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

                {data.properties ? (
                  <div className="details_wrapper">
                    <p>
                      <strong>{t("general-characteristics")}</strong>
                    </p>
                    {data.properties.map((prop) => {
                      return (
                        prop.property.name &&
                        prop.value && (
                          <div
                            className="property_wrapper"
                            key={prop.property.id}
                          >
                            <span className="property_name">
                              {prop.property.name}
                            </span>
                            <div className="border"></div>
                            <span className="property_value">{prop.value}</span>
                          </div>
                        )
                      );
                    })}
                  </div>
                ) : null}
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
                      <div className="d-flex align-items-center">
                        <Rating
                          onChange={(e, newValue) => setRating(newValue)}
                          name="rating"
                          value={rating}
                        />
                        <span className="text-danger ml-2">
                          {rating === 0 ? errorText : ""}
                        </span>
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
                        placeholder={t("comment")}
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn_submit"
                    style={{ marginTop: "1rem" }}
                  >
                    {loading ? (
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    ) : (
                      t("comment")
                    )}
                  </button>
                </form>
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
                  <Spinner
                    style={{
                      display: "block",
                      margin: "auto",
                    }}
                    animation="border"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )}
                {(limit <= count) & !loading ? (
                  <button
                    style={{
                      display: "block",
                      margin: "auto",
                    }}
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
    `${process.env.CATEGORY_API_URL}?lang=${req.i18n.language}`,
  ];

  const [{ product }, { shops }, categories] = await fetchMultipleUrls(urls);

  return {
    props: {
      product,
      shops,
      categories,
    },
  };
}
