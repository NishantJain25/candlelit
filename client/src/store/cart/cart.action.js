import { CART_ACTION_TYPES } from "./cart.types"
import { updateUserCart } from "../../utils/firebase/firebase.utils"
const addItem = (cartItems, productToAdd, quantity) => {
	const existingItem = cartItems.find(
		(cartItem) => cartItem.id == productToAdd.id
	)

	if (existingItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + quantity }
				: cartItem
		)
	}

	return [...cartItems, { ...productToAdd, quantity: quantity }]
}
const removeItem = (cartItems, productToRemove) => {
	return cartItems.filter(
		(cartItem) =>
			cartItem.id !== productToRemove.id ||
			cartItem.color !== productToRemove.color
	)
}

const modifyCartItem = (cartItems, productToModify, operation) => {
	return cartItems.map((cartItem) =>
		cartItem.id === productToModify.id &&
		cartItem.color === productToModify.color
			? operation === "add"
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	)
}

//actions

export const addItemToCart = (
	currentUser,
	cartItems,
	productToAdd,
	quantity
) => {
	const newCartItems = addItem(cartItems, productToAdd, quantity)

	if (currentUser) {
		updateUserCart(currentUser.uid, newCartItems)
	}
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
}
export const removeItemFromCart = (currentUser, cartItems, productToRemove) => {
	const newCartItems = removeItem(cartItems, productToRemove)
	if (currentUser) {
		updateUserCart(currentUser.uid, newCartItems)
	}
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
}
export const modifyCartItemQuantity = (
	currentUser,
	cartItems,
	productToModify,
	operation
) => {
	const newCartItems = modifyCartItem(cartItems, productToModify, operation)
	if (currentUser) {
		updateUserCart(currentUser.uid, newCartItems)
	}
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems }
}

export const clearCart = () => {
	return { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: [] }
}
