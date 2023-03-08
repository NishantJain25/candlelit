import React, { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import Button from "../../components/button/button.component"
import CartItem from "../../components/cart-item/cart-item.component"
import CheckoutDetails from "../../components/checkout-details/checkout-details.component"
import { CartContext } from "../../contexts/cart.context"
import "./cart.styles.scss"

const Cart = () => {
	const { cartItems, cartCount, cartAmount } = useContext(CartContext)

	return (
		<div className="cart-container">
			<header className="cart-header">
				<h1>Your Cart</h1>
			</header>
			<div className="cart-table-container">
				<div className="cart-table">
					
					<div className="table-rows">
						{cartItems.map((cartItem, key) => (
							<CartItem product={cartItem} key={key} />
						))}
					</div>
				</div>
				<div className="order-summary">
					<p id="title">Order Summary</p>
					<CheckoutDetails cartAmount={cartAmount} quantity={cartCount} />

					<div className="checkout-buttons">
						<NavLink to="/shop">Return to shopping</NavLink>
						<NavLink to="/checkout" id="primary">
							Proceed to checkout
						</NavLink>
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
