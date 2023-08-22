import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
	selectCartItems,
	selectCartCount,
	selectCartAmount,
} from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"
import { NavLink } from "react-router-dom"
import Button from "../../components/button/button.component"
import CartItem from "../../components/cart-item/cart-item.component"
import CheckoutDetails from "../../components/checkout-details/checkout-details.component"

import "./cart.styles.scss"

const Cart = () => {
	const cartItems = useSelector(selectCartItems)
	const cartCount = useSelector(selectCartCount)
	const cartAmount = useSelector(selectCartAmount)
	const currentUser = useSelector(selectCurrentUser)
	return (
		<div className="cart-container">
			<header className="cart-header">
				<h1>Your Cart</h1>
			</header>
			<div className="cart-table-container">
				<div className="cart-table">
					{cartItems.length === 0 ? (
						<div id="empty-cart-message">
							<h2>Cart is empty!</h2>
							<p>{!currentUser ? "Login to get saved items" : ""}</p>
						</div>
					) : (
						<div className="table-rows">
							{cartItems.map((cartItem, key) => (
								<CartItem product={cartItem} key={key} />
							))}
						</div>
					)}
				</div>
				<div className="order-summary">
					<p id="title">Order Summary</p>
					<CheckoutDetails cartAmount={cartAmount} quantity={cartCount} />

					<div className="checkout-buttons">
						<NavLink to="/shop">Return to shopping</NavLink>
						{cartCount ? <NavLink to="/checkout" id="primary">
							Proceed to checkout
						</NavLink> : null}
					</div>
					<div className="info">
						<p>
							*Delivery charges are not confirmed until you've reached checkout.
						</p>
						<p>30 Days withdrawal and free returns.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
