import Link from "next/link";
import { FaArrowRight, FaTv } from "react-icons/fa";

export default function DepartmentsMenu({ data }) {
    return (
        <div className="popover_content">
            <ul className="inner_wrap">
                {data.categories.map(item => (
                    <li key={item.id} className="menu_item">
                        <Link href="/category/[id]" as={`/category/${item.slug}`}>
                            <a>
                                <span className="label">
                                    {/* <span className="menu_icon">
                                        <img src={item.image} alt={item.name} className="img-fluid" />
                                    </span> */}
                                    {item.name}
                                </span>
                                <span className="menu_icon"><FaArrowRight /></span>
                            </a>
                        </Link>
                        <ul className="dropdown_menu">
                            <li>
                                <div className="content">
                                    <Link href="/">
                                        <a>Телевизоры</a>
                                    </Link>
                                    <Link href="/">
                                        <a>Цифровое ТВ</a>
                                    </Link>
                                    <Link href="/">
                                        <a>DVD-плеееры</a>
                                    </Link>
                                    <Link href="/">
                                        <a>Домашний кинотеатр и Hi-Fi техника</a>
                                    </Link>
                                    <Link href="/">
                                        <a>Аксессуары</a>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </li>
                ))}

            </ul>
        </div>
    )
}
