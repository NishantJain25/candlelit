import { PRODUCT_ACTION_TYPES } from "./product.types"

export const PRODUCTS_INITIAL_STATE = {
	productList: [],
}

export const productReducer = (state = PRODUCTS_INITIAL_STATE, action = {}) => {
	const { type, payload } = action

	switch (type) {
		case PRODUCT_ACTION_TYPES.SET_PRODUCT_LIST:
			return { ...state, productList: payload }
		default:
			return state
	}
}
