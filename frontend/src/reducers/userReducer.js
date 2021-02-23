import * as actionTypes from '../actions/actionTypes';


const initialState = {
    loading: false,
    error: null,
    userInfo: {}
}

export const userLoginReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.USER_LOGIN_REQUEST:
            return {
                loading: true
            }
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.USER_LOGOUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

export const userRegisterReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.USER_REGISTER_REQUEST:
            return {
                loading: true
            }
        case actionTypes.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case actionTypes.USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.USER_LOGOUT:
            return {
            }
        default:
            return state;
    }
}

const initUserDetails = {
    user: {},
    loading: false,
    error: null
}

export const userDetailsReducer = (state = initUserDetails, action) => {

    switch (action.type) {
        case actionTypes.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.USER_DETAILS_RESET:
            return {
                ...initUserDetails
            }
        default:
            return state;
    }
}

const initUserProfile = {
    userInfo: {},
    loading: false,
    error: null,
    success: false
}
export const userUpdateProfileReducer = (state = initUserProfile, action) => {

    switch (action.type) {
        case actionTypes.USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: action.payload,

            }
        case actionTypes.USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}



const initUserList = {
    users: [],
    loading: false,
    error: null
}
export const userListReducer = (state = initUserList, action) => {

    switch (action.type) {
        case actionTypes.USER_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,

            }
        case actionTypes.USER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.USER_LIST_RESET:
            return {
                ...initUserList
            }
        default:
            return state;
    }
}


const initUserDelete = {
    success: false,
    loading: false,
    error: null
}
export const userDeleteReducer = (state = initUserDelete, action) => {
    switch (action.type) {
        case actionTypes.USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,

            }
        case actionTypes.USER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}



const initUserUpdate = {
    user: {},
    success: false,
    loading: false,
    error: null
}
export const userUpdateReducer = (state = initUserUpdate, action) => {
    switch (action.type) {
        case actionTypes.USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,

            }
        case actionTypes.USER_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.USER_UPDATE_RESET:
            return {
                ...initUserUpdate
            }
        default:
            return state;
    }
}