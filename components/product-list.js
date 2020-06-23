import { Row } from "react-bootstrap"
import ProductListItem from "./product-list-item";

export default function ProductList({ data }) {
    return (
        <main>
            <aside className="sidebar">
                <div className="category_wrapper">
                    <div className="sidebar_wrapper">
                        <div className="inner_wrapper">

                        </div>
                    </div>
                </div>
            </aside>
            <div className="content">
                <div>
                    <Row className="products_row">
                        {data.map(item => (
                            <ProductListItem key={item.id} item={item} />
                        ))}
                    </Row>
                </div>
            </div>
        </main>
    )
}
