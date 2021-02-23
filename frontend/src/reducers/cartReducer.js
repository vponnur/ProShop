import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: null
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:

            const item = action.payload;

            const existItem = state.cartItems.find(i => i.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === item.product ? item : i)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case actionTypes.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload),
            }
        case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case actionTypes.CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default: return state;
    }
}