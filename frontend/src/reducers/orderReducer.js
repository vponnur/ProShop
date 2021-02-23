import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    success: false,
    order: {}
}
export const orderCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case actionTypes.ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}

const initialOrderDetailsState = {
    loading: true,
    error: null,
    order: {},
    orderItems: [],
    shippingAddress: {}
}
export const orderDetailsReducer = (state = initialOrderDetailsState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case actionTypes.ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}


const initialOrderPayState = {
    loading: false,
    error: null,
    order: {},
    success: false
}
export const orderPayReducer = (state = initialOrderPayState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case actionTypes.ORDER_PAY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.ORDER_PAY_RESET:
            return {
                ...initialOrderPayState
            }
        default:
            return state;
    }
}


const initialOrderListMyState = {
    loading: false,
    error: null,
    orders: []
}
export const orderListMyReducer = (state = initialOrderListMyState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_LIST_MY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_LIST_MY_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        case actionTypes.ORDER_LIST_MY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.ORDER_LIST_MY_RESET:
            return {
                ...initialOrderListMyState
            }
        default:
            return state;
    }
}


const initialOrderListState = {
    loading: false,
    error: null,
    orders: []
}
export const orderListReducer = (state = initialOrderListState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload
            }
        case actionTypes.ORDER_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.ORDER_LIST_RESET:
            return {
                ...initialOrderListState
            }
        default:
            return state;
    }
}



const initialOrderDeliverState = {
    loading: false,
    error: null,
    order: {},
    success: false
}
export const orderDeliverReducer = (state = initialOrderDeliverState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_DELIVER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDER_DELIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case actionTypes.ORDER_DELIVER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.ORDER_DELIVER_RESET:
            return {
                ...initialOrderDeliverState
            }
        default:
            return state;
    }
}
