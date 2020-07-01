import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { priceChange } from "../redux/actions/productsActions/productsActions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { numberToPrice } from "../libs/numberToPrice";

const useStyles = makeStyles({
    root: {
        width: "90%",
        margin: "0 auto",
    },
});

export default function RangeSlider() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const priceRange = useSelector(
        (state) => state.products.priceRange,
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
        <div className={classes.root}>
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
        </div>
    );
}
