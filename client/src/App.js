import logo from "./logo.svg"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Navigation from "./components/navigation/navigation.component.jsx"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { selectCartItems } from "./store/cart/cart.selector"
import { addItemToCart } from "./store/cart/cart.action"
import { setCurrentUser } from "./store/user/user.action"
import {
	onAuthStateChangeListener,
	createUserDocFromAuth,
	getUser,
	getUserCart,
} from "./utils/firebase/firebase.utils"

function App() {
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)

	useEffect(() => {
		const unsubscribe = onAuthStateChangeListener((user) => {
			if (user) {
				createUserDocFromAuth(user)
			}
			dispatch(setCurrentUser(user))
		})
		return unsubscribe
	}, [])

	return (
		<div className="App">
			<Navigation />
			<Outlet />
		</div>
	)
}

export default App
