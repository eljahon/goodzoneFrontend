import { authActionTypes } from "./authActionTypes";
import { FaPhone } from "react-icons/fa";

export const setUser = (user) => {
    return {
        type: authActionTypes.SET_USER,
        payload: user,
    };
};

export const phoneAction = (phone) => {
    return {
        type: authActionTypes.PHONE,
        payload: phone,
    };
};


export const logout = () => ({
    type: authActionTypes.LOGOUT,
});



// export const openModal = () => ({
//     type: authActionTypes.OPEN_MODAL,
// });
// export const closeModal = () => ({
//     type: authActionTypes.CLOSE_MODAL,
// });
