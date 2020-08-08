import React, { memo, useState, useRef, useEffect } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router'
import { transliterate } from "../libs/transliterate";
import { withTranslation } from '../i18n'

function SearchModal({ closeModal, t }) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (searchTerm) {
            router.push(`/search/${transliterate(searchTerm)}`)
        }
    }

    const wrapperRef = useRef(null);
    useOutsideCloseMenu(wrapperRef);

    function useOutsideCloseMenu(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    closeModal()
                }
            }
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        }, [ref]);
    }

    return (
        <div className="search_modal-wrapper">
            <div className="search_modal-holder">
                <div className="inner_block">
                    <div className="search_modal" ref={wrapperRef}>
                        <button className="btn close_btn" onClick={closeModal}>
                            <FaArrowLeft />
                        </button>
                        <form className="search_form" onSubmit={(e) => handleSubmit(e)}>
                            <input
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                name="search"
                                id="search"
                                placeholder={t('product-search')}
                            />
                            <button type="submit" className="btn btn_search">
                                <FaSearch />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation('common')(memo(SearchModal));
