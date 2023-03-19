import { PRODUCT_ACTION_TYPES } from "./product.types"

export const setProductList = (productList) => {
	return { type: PRODUCT_ACTION_TYPES.SET_PRODUCT_LIST, payload: productList }
}
