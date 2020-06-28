import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function DepartmentsMenu({ categories }) {
    return (
        <div className="popover_content">
            <ul className="inner_wrap">
                {categories.map((item) => (
                    <li key={item.id} className="menu_item">
                        <Link
                            href="/category/[id]"
                            as={`/category/${item.slug}`}
                        >
                            <a>
                                <span className="label">
                                    {/* <span className="menu_icon">
                                        <img src={item.image} alt={item.name} className="img-fluid" />
                                    </span> */}
                                    {item.name}
                                </span>
                                <span className="menu_icon">
                                    <FaArrowRight />
                                </span>
                            </a>
                        </Link>
                        <ul className="dropdown_menu">
                            <li>
                                <div className="content">
                                    {item.children ? 
                                    item.children.map(child => (
                                        <Link key={child.id} href="/category/[id]" as={`/category/${child.slug}`}>
                                            <a>{child.name}</a>
                                        </Link>
                                    )) : ''
                                }
                                    
                                </div>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
