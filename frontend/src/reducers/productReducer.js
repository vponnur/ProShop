import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: [],
    loading: false,
    error: null,
    pages: 1,
    page: 1
}

export const productListReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: []

            }
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            }
        case actionTypes.PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.PRODUCT_LIST_CLEAN:
            return {
                ...initialState,
                loading: true,
            }
        default:
            return state;
    }
}


const initialProductDetailState = {
    product: {
        reviews: []
    },
    loading: false,
    error: null
}
export const productDetailsReducer = (state = initialProductDetailState, action) => {

    switch (action.type) {
        case actionTypes.PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case actionTypes.PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case actionTypes.PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.PRODUCT_DETAILS_CLEAN:
            return {
                ...initialProductDetailState,
                loading: true
            }
        default:
            return state;
    }
}


const initialProductDeleteState = {
    success: false,
    loading: false,
    error: null
}
export const productDeleteReducer = (state = initialProductDeleteState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            }
        case actionTypes.PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


const initialProductCreateState = {
    success: false,
    loading: false,
    error: null,
    product: {}
}
export const productCreateReducer = (state = initialProductCreateState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PRODUCT_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                product: action.payload
            }
        case actionTypes.PRODUCT_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.PRODUCT_CREATE_RESET:
            return {
                ...initialProductCreateState
            }
        default:
            return state;
    }
}


const initialProductUpdateState = {
    success: false,
    loading: false,
    error: null,
    product: {}
}
export const productUpdateReducer = (state = initialProductUpdateState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                product: action.payload
            }
        case actionTypes.PRODUCT_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.PRODUCT_UPDATE_RESET:
            return {
                ...initialProductUpdateState
            }
        default:
            return state;
    }
}



const initialProductReviewCreateState = {
    success: false,
    loading: false,
    error: null,
}
export const productReviewCreateReducer = (state = initialProductReviewCreateState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            }
        case actionTypes.PRODUCT_CREATE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.PRODUCT_CREATE_REVIEW_RESET:
            return {
                ...initialProductReviewCreateState
            }
        default:
            return state;
    }
}



const initialproductTopRatedState = {
    products: [],
    loading: false,
    error: null,
}
export const productTopRatedReducer = (state = initialproductTopRatedState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_TOP_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PRODUCT_TOP_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case actionTypes.PRODUCT_TOP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}
