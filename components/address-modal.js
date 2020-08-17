import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import axios from 'axios'

export default function AddressModal({ closeModal }) {
    const [load, setLoad] = useState(false);
    useEffect(() => {
        setLoad(true);
        document.body.classList.add("overflow");
        return () => {
            setLoad(false);
            document.body.classList.remove("overflow");
        };
    }, []);

    const { register, handleSubmit, errors } = useForm();

    const wrapperRef = useRef(null);
    useOutsideCloseMenu(wrapperRef);

    function useOutsideCloseMenu(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    closeModal();
                }
            }
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };

        }, [ref]);
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(process.env.PROFILE_API_URL, {
                address: data.address
            });

            if (response.status === 200) {
                closeModal();
                console.log(response.data)
            }
        } catch (error) {
            swal(error.response.data.Error.Message);
        }
    }

    return (
        <div className="login_modal-wrapper">
            <button className="btn close_btn" onClick={closeModal}>
                <FaTimes />
            </button>
            <div className={`login_modal-holder ${load ? "show" : ""}`} ref={wrapperRef}>
                <button className="btn close_btn" onClick={closeModal}>
                    <FaTimes />
                </button>
                <div className="inner_block">
                    <div className="auth_form address_form">
                        <div className="auth_form-container">
                            <h3>Edit address</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter title"
                                    required
                                />
                                <textarea
                                    ref={register}
                                    name="address"
                                    id="address"
                                    cols="30"
                                    rows="10"
                                    placeholder="Enter address"
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className="btn btn_submit"
                                >
                                    Save address
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
