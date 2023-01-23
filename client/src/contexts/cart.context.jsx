import { useState, useEffect, createContext, useContext } from "react"
import { UserContext } from "./user.context"
import { getUserCart, updateUserCart } from "../utils/firebase/firebase.utils"
export const CartContext = createContext({
	cartItems: [],
	addItemToCart: () => {},
	removeItemfromCart: () => {},
	modifyCartItemQuantity: () => {},
	cartCount: 0,
	cartAmount: 0,
})

const addItem = (cartItems, productToAdd, quantity) => {
	const existingItem = cartItems.find(
		(cartItem) =>
			cartItem.id == productToAdd.id &&
			cartItem.color == productToAdd.color &&
			cartItem.scent == productToAdd.scent
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

export const CartProvider = ({ children }) => {
	const { currentUser } = useContext(UserContext)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartAmount, setCartAmount] = useState(0)

	useEffect(() => {
		if (!currentUser) return
		const getCart = async () => {
			const data = await getUserCart(currentUser.uid)

			setCartItems(data.cartItems)
			setCartCount(data.cartCount)
			setCartAmount(data.cartAmount)
		}

		getCart()
	}, [currentUser])

	const updateCart = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		)
		const newCartAmount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		)
		setCartItems(newCartItems)
		setCartCount(newCartCount)
		setCartAmount(newCartAmount)
		if (currentUser) {
			updateUserCart(currentUser.uid, {
				cartItems: newCartItems,
				cartCount: newCartCount,
				cartAmount: newCartAmount,
			})
		}
	}
	const addItemToCart = (productToAdd, quantity) => {
		const newCartItems = addItem(cartItems, productToAdd, quantity)
		updateCart(newCartItems)
	}
	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeItem(cartItems, productToRemove)
		updateCart(newCartItems)
	}
	const modifyCartItemQuantity = (productToModify, operation) => {
		const newCartItems = modifyCartItem(cartItems, productToModify, operation)
		updateCart(newCartItems)
	}
	const value = {
		cartItems,
		addItemToCart,
		removeItemFromCart,
		modifyCartItemQuantity,
		cartCount,
		cartAmount,
	}
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
