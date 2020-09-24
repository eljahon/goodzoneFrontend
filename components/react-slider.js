import React, { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import { priceChange } from "../redux/actions/filterActions/filterActions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { numberToPrice } from "../libs/numberToPrice";

export default function RangeSlider() {
    const dispatch = useDispatch();

    const priceRange = useSelector(
        (state) => state.filters.priceRange,
        shallowEqual
    );

    const [inputRangeValue, setInputRangeValue] = useState(priceRange);

    useEffect(() => {
        setInputRangeValue(priceRange);
    }, [priceRange]);

    const handleChange = (e, newValue) => setInputRangeValue(newValue);
    const handlePriceChange = (e, newValue) => {
        dispatch(priceChange(newValue));
    };

    return (
        <>
            <p className="filter_price">
                {numberToPrice(inputRangeValue[0])} &ndash;{" "}
                {numberToPrice(inputRangeValue[1])}
            </p>
            <Slider
                min={priceRange[0]}
                max={priceRange[1]}
                value={inputRangeValue}
                onChange={handleChange}
                onChangeCommitted={handlePriceChange}
                aria-labelledby="range-slider"
                track={false}
            />
        </>
    );
}
