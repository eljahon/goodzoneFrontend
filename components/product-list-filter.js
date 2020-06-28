import React, { useEffect, useState } from 'react'
import InputRange from 'react-input-range'
import { numberToPrice } from '../libs/numberToPrice'

export default function ProductListFilter() {
    const [value, setValue] = useState({min: 2461000, max: 7995000});
    const handleScroll = () => {
        if (
            (document.body.scrollTop > 395 &&
                document.body.scrollTop < document.body.clientHeight - 900) ||
            (document.documentElement.scrollTop > 395 &&
                document.documentElement.scrollTop <
                document.body.clientHeight - 900)
        ) {
            document.getElementById("sidebar").classList.add("sticky");
        } else {
            document
                .getElementById("sidebar")
                .classList.remove("sticky");
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });
    return (
        <aside className="sidebar" id="sidebar">
            <div className="category_wrapper">
                <div className="sidebar_wrapper">
                    <div className="outer_wrapper">
                        <div className="inner_wrapper">
                            <form>
                                <h3>Фильтр</h3>
                                <div className="filter_group">
                                    <h5>Фильтрация по цене</h5>
                                    <p className="filter_price">{numberToPrice(value.min)} &ndash; {numberToPrice(value.max)}</p>
                                    <InputRange
                                        minValue={2461000}
                                        maxValue={7995000}
                                        value={value}
                                        onChange={(value) => setValue(value)}
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
    )
}