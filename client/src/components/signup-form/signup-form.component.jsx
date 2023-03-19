import "./signup-form.styles.scss"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectCartItems } from "../../store/cart/cart.selector"

import { useNavigate } from "react-router-dom"
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
	getUserCart,
} from "../../utils/firebase/firebase.utils"
import FormInput from "../../components/form-input/form-input.component"
import Button from "../../components/button/button.component"

const SignUp = () => {
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const defaultFormFields = {
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	}
	const defaultFormErrors = {
		displayNameError: "",
		emailError: "",
		passwordError: "",
		confirmPasswordError: "",
		authError: "",
	}
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [formErrors, setFormErrors] = useState(defaultFormErrors)
	const { displayName, email, password, confirmPassword } = formFields

	const {
		displayNameError,
		emailError,
		passwordError,
		confirmPasswordError,
		authError,
	} = formErrors

	const handleChange = (event) => {
		const { name } = event.target
		setFormFields({ ...formFields, [name]: event.target.value })
	}

	const resetForm = () => {
		setFormFields(defaultFormFields)
		setFormErrors(defaultFormErrors)
	}

	const showError = (errorVariable, errorMessage) => {
		setFormErrors({ ...formErrors, [errorVariable]: errorMessage })
		setTimeout(
			() => setFormErrors({ ...formErrors, [errorVariable]: "" }),
			3000
		)
	}
	const onSubmit = async (event) => {
		event.preventDefault()

		if (displayName.length === 0) {
			showError("displayNameError", "Required Field.")
			return
		}
		if (email.length === 0) {
			showError("emailError", "Required Field.")
			return
		}
		if (password.length === 0) {
			showError("passwordError", "Required Field.")
			return
		}
		if (password.length < 8) {
			showError(
				"passwordError",
				"Password should be atleast 8 characters long."
			)
			return
		}

		if (confirmPassword !== password) {
			showError(
				"confirmPasswordError",
				"Passwords do not match. Please check your password"
			)
			return
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password)

			await createUserDocFromAuth(user, cartItems, { displayName })
			
			resetForm()
			navigate(-1)
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				setFormErrors({
					...formErrors,
					authError: "Cannot create user. Email already in use.",
				})
			}
			console.log("User creation encountered an error ", error.message)
		}
	}

	return (
		<div className="signup-form-container">
			<h2>Sign Up</h2>
			<form onSubmit={onSubmit} noValidate>
				<FormInput
					label="Name"
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
					error={displayNameError}
				/>

				<FormInput
					label="Email"
					type="text"
					name="email"
					value={email}
					onChange={handleChange}
					error={emailError}
				/>

				<FormInput
					label="Password (min. 8 characters long)"
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					error={passwordError}
				/>
				<FormInput
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					error={confirmPasswordError}
				/>
				{authError && <p className="error">{authError}</p>}
				<Button type="submit" buttonType="primary">
					Sign up
				</Button>
			</form>
		</div>
	)
}

export default SignUp
