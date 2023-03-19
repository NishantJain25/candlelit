import { createSelector } from "reselect"
export const selectProduct = (state) => state.product

export const selectProductList = createSelector(
	[selectProduct],
	(productsSlice) => {
		console.log(productsSlice)
		return productsSlice.productList
	}
)
