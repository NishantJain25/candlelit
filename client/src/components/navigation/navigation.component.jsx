import "./navigation.styles.scss"
import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../../contexts/user.context"

const Navigation = () => {
	const { currentUser } = useContext(UserContext)

	return (
		<div className="navigation">
			<div className="logo">CandleLit</div>
			<nav className="navigation-bar">
				<ul>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) => (isActive ? "active" : "")}
							end
						>
							HOME
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/shop"
							className={({ isActive }) => (isActive ? "active" : "")}
						>
							SHOP
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/about"
							className={({ isActive }) => (isActive ? "active" : "")}
						>
							ABOUT US
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/reviews"
							className={({ isActive }) => (isActive ? "active" : "")}
						>
							REVIEWS
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className="action-buttons">
				<NavLink
					to="/auth"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					{currentUser ? `Hello ${currentUser.displayName}` : "LOGIN"}
				</NavLink>

				<p className="cart">Cart (0)</p>
			</div>
		</div>
	)
}

export default Navigation
