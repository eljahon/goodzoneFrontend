import Link from "next/link";
import {FaArrowRight, FaTv, FaMobileAlt} from "react-icons/fa";

export default function DepartmentsMenu() {
    return (
        <div className="popover_content">
            <ul className="inner_wrap">
                <li className="menu_item">
                    <Link href="/">
                        <a>
                            <span className="menu_icon"><FaTv /></span>
                            <span className="label">Телевизоры, Hi-Fi, аудио</span>
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
                <li className="menu_item">
                    <Link href="/">
                        <a>
                            <span className="menu_icon"><FaMobileAlt /></span>
                            <span className="label">Смартфоны и гаджеты</span>
                            <span className="menu_icon"><FaArrowRight /></span>
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
                </li>
            </ul>
        </div>
    )
}