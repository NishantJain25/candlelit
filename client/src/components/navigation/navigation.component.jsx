import "./navigation.styles.scss"
import React, { useState, useContext, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"
import { VscMenu, VscChromeClose } from "react-icons/vsc"

const Navigation = () => {
	const { currentUser } = useContext(UserContext)
	const { cartCount } = useContext(CartContext)

	const [isSidenavOpen, setIsSidenavOpen] = useState(false)

	return (
		<div className="navigation">
			<div
				className="hamburger-menu"
				onClick={() => setIsSidenavOpen((currentState) => !currentState)}
			>
				{isSidenavOpen ? <VscChromeClose /> : <VscMenu />}
			</div>
			<div
				className="sidenav"
				style={{ width: `${isSidenavOpen ? "75%" : "0"}` }}
			>
				<div className="links">
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? "active" : "")}
						end
					>
						HOME
					</NavLink>
					<NavLink
						to="/shop"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						SHOP
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						ABOUT US
					</NavLink>
					<NavLink
						to="/contact"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						CONTACT US
					</NavLink>
				</div>
			</div>
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
							to="/contact"
							className={({ isActive }) => (isActive ? "active" : "")}
						>
							CONTACT US
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className="action-buttons">
				{currentUser ? (
					<NavLink
						to="/account"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						My Account
					</NavLink>
				) : (
					<NavLink
						to="/auth"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						LOGIN
					</NavLink>
				)}
				<NavLink
					to="/cart"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Cart ({cartCount})
				</NavLink>
			</div>
		</div>
	)
}

export default Navigation
