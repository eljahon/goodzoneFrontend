import { Row } from "react-bootstrap";
import ProductListItem from "./product-list-item";

export default function ProductList({ data }) {
    // console.log("data", data);
    return (
        <main>
            <aside className="sidebar">
                <div className="category_wrapper">
                    <div className="sidebar_wrapper">
                        <div className="outer_wrapper">
                            <div className="inner_wrapper">
                                <form>
                                    <h3>Фильтр</h3>
                                    <div className="filter_group">
                                        <h5>Фильтрация по цене</h5>
                                        <input
                                            type="text"
                                            name="amount_from"
                                            id="amount_from"
                                            placeholder="от"
                                        />
                                        <input
                                            type="text"
                                            name="amount_to"
                                            id="amount_to"
                                            placeholder="до"
                                        />
                                    </div>
                                    <div className="filter_group">
                                        <h5>Бренды</h5>
                                        <div className="check_box">
                                            <input
                                                type="checkbox"
                                                name="sony"
                                                id="sony"
                                            />
                                            <label htmlFor="sony">Sony</label>
                                        </div>
                                        <div className="check_box">
                                            <input
                                                type="checkbox"
                                                name="lg"
                                                id="lg"
                                            />
                                            <label htmlFor="lg">LG</label>
                                        </div>
                                        <div className="check_box">
                                            <input
                                                type="checkbox"
                                                name="samsung"
                                                id="samsung"
                                            />
                                            <label htmlFor="samsung">
                                                Samsung
                                            </label>
                                        </div>
                                        <div className="check_box">
                                            <input
                                                type="checkbox"
                                                name="haier"
                                                id="haier"
                                            />
                                            <label htmlFor="haier">Haier</label>
                                        </div>
                                        <div className="check_box">
                                            <input
                                                type="checkbox"
                                                name="artel"
                                                id="artel"
                                            />
                                            <label htmlFor="artel">Artel</label>
                                        </div>
                                        <div className="check_box">
                                            <input
                                                type="checkbox"
                                                name="rosso"
                                                id="rosso"
                                            />
                                            <label htmlFor="rosso">Rosso</label>
                                        </div>
                                        <div className="check_box">
                                            <input
                                                type="checkbox"
                                                name="roison"
                                                id="roison"
                                            />
                                            <label htmlFor="roison">
                                                Roison
                                            </label>
                                        </div>
                                        <div className="check_box">
                                            <input
                                                type="checkbox"
                                                name="hisense"
                                                id="hisense"
                                            />
                                            <label htmlFor="hisense">
                                                Hisense
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="content">
                <div>
                    <Row className="products_row">
                        {data.map((item) => {
                            return (
                                <ProductListItem key={item.id} item={item} />
                            );
                        })}
                    </Row>
                </div>
            </div>
        </main>
    );
}
