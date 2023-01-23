import React, { useState, useEffect, useContext } from "react"
import { useNavigate, NavLink, Routes, Route } from "react-router-dom"
import { UserContext } from "../../contexts/user.context"
import { getUser } from "../../utils/firebase/firebase.utils"
import { signUserOut } from "../../utils/firebase/firebase.utils"
import { VscChevronRight } from "react-icons/vsc"
import Button from "../../components/button/button.component"
import Orders from "../orders/orders.component"
import Profile from "../profile/profile.component"
import Alert from "../../components/alert/alert.component"
import "./account.styles.scss"

const Account = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [shouldUpdate, setShouldUpdate] = useState(false)
	const [user, setUser] = useState({})
	const [show, setShow] = useState(false)
	const { currentUser } = useContext(UserContext)

	useEffect(() => {
		setIsLoading(true)
		const getUserData = async () => {
			const response = await getUser(currentUser.uid)
			setUser({ userID: currentUser.uid, ...response })
			setIsLoading(false)
		}
		getUserData()
		console.log("update")
		setShouldUpdate(false)
	}, [currentUser, shouldUpdate])
	const navigate = useNavigate()
	const handleSignOut = () => {
		signUserOut()
		navigate("/auth")
	}
	console.log(shouldUpdate)
	return (
		<div className="account-container">
			<h1>Hello {user.displayName}</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="grid">
					<div className="actions">
						<div className="action-buttons">
							<div className="action-item">
								<NavLink
									to="./"
									className={({ isActive }) => (isActive ? "active" : "")}
									end
								>
									Your Profile
								</NavLink>
								<VscChevronRight />
							</div>
							<div className="action-item">
								<NavLink
									to="./orders"
									className={({ isActive }) => (isActive ? "active" : "")}
								>
									Your Orders
								</NavLink>
								<VscChevronRight />
							</div>
							<div className="action-item">
								<NavLink
									to="/contact"
									className={({ isActive }) => (isActive ? "active" : "")}
								>
									Contact Us
								</NavLink>
								<VscChevronRight />
							</div>

							<Button buttonType="secondary" onClick={handleSignOut}>
								Log Out
							</Button>
						</div>
					</div>
					<Routes>
						<Route
							index
							element={
								<Profile
									user={user}
									setShouldUpdate={setShouldUpdate}
									setShow={setShow}
								/>
							}
						/>
						<Route path="/orders" element={<Orders />} />
					</Routes>
				</div>
			)}
			<Alert
				show={show}
				message={"Details have been updated successfully"}
				type={"success"}
			/>
		</div>
	)
}

export default Account
