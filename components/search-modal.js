import React from 'react'
import { FaSearch, FaArrowLeft } from "react-icons/fa";

export default function SearchModal({ closeModal }) {
    return (
        <div className="search_modal-wrapper">
            <div className="search_modal-holder">
                <div className="inner_block">
                    <div className="search_modal">
                        <button className="btn close_btn" onClick={closeModal}>
                            <FaArrowLeft />
                        </button>
                        <form className="search_form">
                            <input type="text" name="search" id="search" placeholder="Поиск по товарам" />
                            <button type="submit" className="btn btn_search">
                                <FaSearch />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}