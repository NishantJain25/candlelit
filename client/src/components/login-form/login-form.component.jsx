import "./login-form.styles.scss"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormInput from "../../components/form-input/form-input.component"
import Button from "../../components/button/button.component"
import {
	signInAuthUserWithEmailAndPassword,
	forgotPassword,
	getUserCart,
} from "../../utils/firebase/firebase.utils"
import { selectCartItems } from "../../store/cart/cart.selector"
import { addItemToCart } from "../../store/cart/cart.action"

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const defaultFormFields = {
		email: "",
		password: "",
	}
	const defaultFormErrors = {
		emailError: "",
		passwordError: "",
		authError: "",
	}
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [formErrors, setFormErrors] = useState(defaultFormErrors)

	const { email, password } = formFields
	const { emailError, passwordError, authError } = formErrors
	const handleChange = (event) => {
		const { name } = event.target
		setFormFields({ ...formFields, [name]: event.target.value })
	}

	const resetForm = () => {
		setFormFields(defaultFormFields)
		setFormErrors(defaultFormErrors)
	}

	const forgotPasswordHandler = () => {
		if (!email) return
		forgotPassword(email).then(() => {
			resetForm()
			alert("Please check your email for resetting the password")
		})
	}
	const onSubmit = async (event) => {
		event.preventDefault()

		if (email.length === 0) {
			setFormErrors({ ...formErrors, emailError: "Required Field." })
			setTimeout(() => setFormErrors({ ...formErrors, emailError: "" }), 2000)
			return
		}
		if (password.length === 0) {
			setFormErrors({ ...formErrors, passwordError: "Required Field." })
			setTimeout(
				() => setFormErrors({ ...formErrors, passwordError: "" }),
				3000
			)
			return
		}

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password)
			const data = await getUserCart(user.uid)

			data.cartItems.map((cartItem) => {
				dispatch(addItemToCart(user, cartItems, cartItem, cartItem.quantity))
			})

			resetForm()
			navigate(-1)
		} catch (error) {
			console.log(error.code)
		}
	}
	return (
		<div className="login-form-container">
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
				<FormInput
					label="Email"
					type="text"
					name="email"
					value={email}
					onChange={handleChange}
					error={emailError}
				/>

				<FormInput
					label="Password"
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					error={passwordError}
				/>

				<Button type="submit" buttonType="primary">
					Login
				</Button>
			</form>
			<button id="forgot-password" onClick={forgotPasswordHandler}>
				Forgot password?
			</button>
		</div>
	)
}

export default Login
