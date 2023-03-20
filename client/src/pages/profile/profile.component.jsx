import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { VscEdit } from "react-icons/vsc"
import Button from "../../components/button/button.component"
import FormInput from "../../components/form-input/form-input.component"

import { updateUser } from "../../utils/firebase/firebase.utils"
import "./profile.styles.scss"
const Profile = ({ user, setShouldUpdate, setShow }) => {
	const [currentUser, setCurrentUser] = useState(user)
	const navigate = useNavigate()
	const defaultFormErrors = {
		nameError: "",
		addressError: "",
		houseError: "",
		postalCodeError: "",
		cityError: "",
		stateError: "",
		phoneNumberError: "",
	}
	const [editMode, setEditMode] = useState(false)

	const [formFields, setFormFields] = useState({
		displayName: currentUser.displayName,
		address: currentUser.address ? currentUser.address.address : "",
		house: currentUser.address ? currentUser.address.house : "",
		postalCode: currentUser.address ? currentUser.address.postalCode : "",
		city: currentUser.address ? currentUser.address.city : "",
		state: currentUser.address ? currentUser.address.state : "",
		phoneNumber: currentUser.phoneNumber ? currentUser.phoneNumber : "",
	})
	const [formErrors, setFormErrors] = useState(defaultFormErrors)

	const { displayName, address, house, postalCode, city, state, phoneNumber } =
		formFields
	const {
		nameError,
		addressError,
		houseError,
		postalCodeError,
		cityError,
		stateError,
		phoneNumberError,
	} = formErrors

	const handleChange = (e) => {
		setFormFields({ ...formFields, [e.target.name]: e.target.value })
	}

	const onSubmit = async (event) => {
		event.preventDefault()

		if (displayName.length === 0) {
			setFormErrors({ ...formErrors, nameError: "Required Field." })
			setTimeout(() => setFormErrors({ ...formErrors, nameError: "" }), 3000)
			return
		}
		if (address.length === 0) {
			setFormErrors({ ...formErrors, addressError: "Required Field." })
			setTimeout(() => setFormErrors({ ...formErrors, addressError: "" }), 3000)
			return
		}
		if (phoneNumber.length < 10) {
			setFormErrors({
				...formErrors,
				phoneNumberError: "Phone number should be 10 characters long",
			})
			setTimeout(() => setFormErrors({ ...formErrors, addressError: "" }), 3000)
			return
		}

		const userData = {
			displayName,
			address: { address, house, postalCode, city, state },
			phoneNumber: phoneNumber,
		}
		try {
			await updateUser(currentUser.userID, userData)
			setEditMode(false)
			setShouldUpdate(true)
			setShow(true)
			setTimeout(() => setShow(false), 3000)
		} catch (error) {
			console.log(error)
		}
	}
	console.log(state)
	const fullAddress = house + " " + address + " " + city + " " + state
	return (
		<div className="profile">
			<header>
				<p>Your Details</p>
			</header>

			<div className="detail-container">
				<button
					id="edit-button"
					onClick={() => setEditMode((currentState) => !currentState)}
				>
					Edit <VscEdit />
				</button>
				<div className="detail-field">
					<p className="label">Name</p>
					<p className="value" style={{ display: `${editMode ? "none" : ""}` }}>
						{currentUser.displayName}
					</p>
					<FormInput
						name="displayName"
						value={displayName}
						onChange={handleChange}
						style={{ display: `${editMode ? "" : "none"}` }}
						error={nameError}
					/>
				</div>

				<div className="detail-field">
					<p className="label">Email</p>
					<p className="value" style={{ color: `${editMode ? "gray" : ""}` }}>
						{currentUser.email}
					</p>
				</div>
				<div className="detail-field">
					<p className="label">Address</p>
					<p className="value" style={{ display: `${editMode ? "none" : ""}` }}>
						{currentUser.address ? fullAddress : "No address saved"}
					</p>
					<div
						id="address-form"
						style={{ display: `${editMode ? "" : "none"}` }}
					>
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
								className={`${
									state.length > 0 ? "shrink" : ""
								} form-input-label`}
							>
								Select State
							</label>
						</div>
					</div>
				</div>
				<div className="detail-field">
					<p className="label">Phone Number</p>
					<p className="value" style={{ display: `${editMode ? "none" : ""}` }}>
						{currentUser.phoneNumber
							? currentUser.phoneNumber
							: "No number saved"}
					</p>
					<FormInput
						name="phoneNumber"
						value={phoneNumber}
						onChange={handleChange}
						style={{ display: `${editMode ? "" : "none"}` }}
						error={phoneNumberError}
					/>
				</div>
				<div
					className="form-buttons"
					style={{ display: `${editMode ? "" : "none"}` }}
				>
					<Button buttonType="primary" onClick={onSubmit}>
						Save Changes
					</Button>
					<Button buttonType="secondary" onClick={() => setEditMode(false)}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Profile
