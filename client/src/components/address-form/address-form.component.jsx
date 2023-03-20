import React, { useState, useEffect } from "react"
import { updateUser, getUser } from "../../utils/firebase/firebase.utils"
import FormInput from "../../components/form-input/form-input.component"
import Button from "../../components/button/button.component"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import "./address-form.styles.scss"

const AddressForm = () => {
	const [user, setUser] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const currentUser = useSelector(selectCurrentUser)
	const defaultFormFields = {
		address: "",
		house: "",
		postalCode: "",
		city: "",
		state: "",
		phoneNumber: "",
	}
	const defaultFormFieldErrors = {
		addressError: "",
		houseError: "",
		postalCodeError: "",
		cityError: "",
		stateError: "",
		phoneNumberError: "",
	}
	const [formFields, setFormFields] = useState(defaultFormFields)
	const [formFieldErrors, setFormFieldErrors] = useState(defaultFormFieldErrors)
	const { address, house, postalCode, city, state, phoneNumber } = formFields
	const {
		addressError,
		houseError,
		postalCodeError,
		cityError,
		stateError,
		phoneNumberError,
	} = formFieldErrors

	useEffect(() => {
		setIsLoading(true)
		const getUserData = async () => {
			const response = await getUser(currentUser.uid)
			setUser({ userID: currentUser.uid, ...response })
			setIsLoading(false)
		}
		getUserData()
	}, [currentUser])
	const handleChange = (e) => {
		e.preventDefault()
		setFormFields({ ...formFields, [e.target.name]: e.target.value })
	}

	const saveUserAddress = (e) => {
		e.preventDefault()
		const userAddress = {
			address: { address, house, postalCode, city, state },
			phoneNumber: phoneNumber,
		}
		updateUser(currentUser.uid, userAddress).then((response) =>
			alert("user updated")
		)
	}

	const useSavedAddress = () => {
		setFormFields((formFields) => ({
			...formFields,
			...user.address,
			phoneNumber: user.phoneNumber,
		}))
	}

	console.log(formFields)
	return (
		<div className="address-form-container">
			<p className="saved-address-heading">Saved Address</p>
			{user.address ? (
				<div className="saved-address">
					<p>
						{user.address.house +
							" " +
							user.address.address +
							" " +
							user.address.city +
							" " +
							user.address.state}
					</p>
					<Button buttonType="secondary" onClick={useSavedAddress}>
						Use Address
					</Button>
				</div>
			) : (
				<p>No address saved</p>
			)}
			<form className="address-form">
				<FormInput
					label="House number"
					name="house"
					value={house}
					onChange={handleChange}
				/>
				<FormInput
					label="Address"
					name="address"
					value={address}
					onChange={handleChange}
				/>
				<FormInput
					label="Postal Code"
					name="postalCode"
					value={postalCode}
					onChange={handleChange}
				/>
				<FormInput
					label="City"
					name="city"
					value={city}
					onChange={handleChange}
				/>
				<div className="state-dropdown">
					<select name="state" value={state} onChange={handleChange}>
						<option value="none" defaultValue hidden></option>
						<option value="maharashtra">Maharashtra</option>
						<option value="gujarat">Gujarat</option>
						<option value="delhi">Delhi</option>
						<option value="chennai">Chennai</option>
					</select>
					<label
						className={`${state.length > 0 ? "shrink" : ""} form-input-label`}
					>
						Select State
					</label>
				</div>
				<FormInput
					label="Phone Number"
					name="phoneNumber"
					value={phoneNumber}
					onChange={handleChange}
				/>
				<Button buttonType="primary" onClick={saveUserAddress}>
					Save Address and Number
				</Button>
			</form>
		</div>
	)
}

export default AddressForm
