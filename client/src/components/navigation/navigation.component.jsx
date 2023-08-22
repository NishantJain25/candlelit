import "./navigation.styles.scss"
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectCartCount } from "../../store/cart/cart.selector"
import { VscMenu, VscChromeClose } from "react-icons/vsc"

const Navigation = () => {
	const cartCount = useSelector(selectCartCount)
	const currentUser = useSelector(selectCurrentUser)
	const [isSidenavOpen, setIsSidenavOpen] = useState(false)

	// change navbar color when scrolling
	const [bgColor, setBgColor] = useState(false)
	const changeBgColor = () => {
		if (window.scrollY >= 60) {
			setBgColor(true)
		} else {
			setBgColor(false)
		}
	}

	window.addEventListener("scroll", changeBgColor)

	return (
		<div className={bgColor ? "navigation navigation-bg" : "navigation"}>
			<div
				className="hamburger-menu"
				onClick={() => setIsSidenavOpen((currentState) => !currentState)}
			>
				{isSidenavOpen ? <VscChromeClose id="close" /> : <VscMenu id="menu" />}
			</div>
			<div
				className="sidenav"
				style={{ transform: `translate(${isSidenavOpen ? "0%" : "-100%"})` }}
			>
				<div className="links">
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? "active" : "")}
						onClick={() => setIsSidenavOpen(false)}
						end
					>
						HOME
					</NavLink>
					<NavLink
						to="/shop"
						className={({ isActive }) => (isActive ? "active" : "")}
						onClick={() => setIsSidenavOpen(false)}
					>
						SHOP
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) => (isActive ? "active" : "")}
						onClick={() => setIsSidenavOpen(false)}
					>
						ABOUT US
					</NavLink>
					<NavLink
						to="/contact"
						className={({ isActive }) => (isActive ? "active" : "")}
						onClick={() => setIsSidenavOpen(false)}
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
