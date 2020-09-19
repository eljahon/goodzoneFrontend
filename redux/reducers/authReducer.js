import { authActionTypes } from "../actions/authActions/authActionTypes";

const initialState = {
    user: null,
    isModalOpen: false,
    phone: ""
};

const authReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case authActionTypes.SET_USER:
            return {
                ...state,
                user: payload,
            };
        case authActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
            };
        case authActionTypes.PHONE:
            return {
                ...state,
                phone: payload
            }
        // case authActionTypes.OPEN_MODAL:
        //     return {
        //         ...state,
        //         isModalOpen: true,
        //     };
        // case authActionTypes.CLOSE_MODAL:
        //     return {
        //         ...state,
        //         isModalOpen: false,
        //     };
        default:
            return state;
    }
};

export default authReducer;
