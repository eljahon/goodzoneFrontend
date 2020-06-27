import Link from "next/link";
import { FaArrowRight, FaTv, FaMobileAlt } from "react-icons/fa";
import { useSelector, shallowEqual } from "react-redux";

export default function DepartmentsMenu() {
    const categories = useSelector(
        (state) => state.categories.categoryItems,
        shallowEqual
    );

    return (
        <div className="popover_content">
            <ul className="inner_wrap">
                {categories.map((category) => {
                    return (
                        <li key={category.id} className="menu_item">
                            <Link href="/">
                                <a>
                                    <span className="menu_icon">
                                        <FaTv />
                                    </span>
                                    <span className="label">
                                        {category.name}
                                    </span>
                                    <span className="menu_icon">
                                        <FaArrowRight />
                                    </span>
                                </a>
                            </Link>
                            {category.children ? (
                                <ul className="dropdown_menu">
                                    <li>
                                        <div className="content">
                                            {category.children.map(
                                                (subCategory) => {
                                                    return (
                                                        <Link
                                                            key={subCategory.id}
                                                            href="/"
                                                        >
                                                            <a>
                                                                {
                                                                    subCategory.name
                                                                }
                                                            </a>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </li>
                                </ul>
                            ) : null}
                        </li>
                    );
                })}
                {/* <li className="menu_item">
                    <Link href="/">
                        <a>
                            <span className="menu_icon">
                                <FaMobileAlt />
                            </span>
                            <span className="label">Смартфоны и гаджеты</span>
                            <span className="menu_icon">
                                <FaArrowRight />
                            </span>
                        </a>
                    </Link>
                    <ul className="dropdown_menu">
                        <li>
                            <div className="content">
                                <Link href="/">
                                    <a>Смартфоны</a>
                                </Link>
                                <Link href="/">
                                    <a>Телефоны</a>
                                </Link>
                                <Link href="/">
                                    <a>Планшеты</a>
                                </Link>
                                <Link href="/">
                                    <a>Гаджеты</a>
                                </Link>
                                <Link href="/">
                                    <a>Аксессуары для смартфонов</a>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </li> */}
            </ul>
        </div>
    );
}
