import React from "react"
import { NavLink } from "react-router-dom"

import "./checkout-product.styles.scss"

const CheckoutProduct = ({ cartItem }) => {
	const { id, name, price, color, images, weight, quantity, fragrance } =
		cartItem
	return (
		<div className="checkout-product">
			<div
				className="img"
				style={{
					backgroundImage: `url(${images[0]})`,
					backgroundColor: "beige",
				}}
			></div>
			<div className="details">
				<NavLink to={`/product/${id}`}>
					<p id="name">{name}</p>
				</NavLink>
				<p id="price">Rs.{price}</p>
				<div className="info-grid">
					<p id="cart-quantity">Quantity:</p>
					<p id="value">{quantity}</p>
					<p id="fragrance">fragrance:</p>
					<p id="value">{fragrance}</p>
					<p id="color">Colour:</p>
					<p id="Value">{color}</p>
					<p id="weight">Weight:</p>
					<p id="value">
						{weight}
						<span>g</span>
					</p>
					<p id="total">Total:</p>
					<p id="value">Rs.{price * quantity}</p>
				</div>
			</div>
		</div>
	)
}

export default CheckoutProduct
