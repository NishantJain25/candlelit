import React, { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { CartContext } from "../../contexts/cart.context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import "./cart-item.styles.scss"

const CartItem = ({ product }) => {
	const { id, name, price, quantity, images, fragrance, color, category } =
		product

	const { modifyCartItemQuantity, addItemToCart, removeItemFromCart } =
		useContext(CartContext)

	const handleQuantity = (operation) => {
		if (quantity === 1 && operation === "subtract") {
			removeItemFromCart(product)
		} else {
			modifyCartItemQuantity(product, operation)
		}
	}
	return (
		<div className="cart-item-container">
			<NavLink to={`/product/${id}`}>
				<div className="product">
					<div className="image">
						<img src={images[0]} />
					</div>
					<div className="details">
						<p id="name">{name}</p>
						<div id="price">Rs. {price}</div>
						<div id="info">
							<p className="label">Category: </p>
							<p className="value">{category}</p>
							<p className="label">Fragrance: </p>
							<p className="value">{fragrance}</p>
							<p className="label">Colour:</p>
							<div
								className="value"
								id="color-pill"
								style={{ backgroundColor: `${color}` }}
							>
								{color}
							</div>
							<p className="label">Total Price: </p>
							<p className="value" id="total">
								Rs. {price * quantity}
							</p>
						</div>

						<div className="quantity" id="quantity">
							<button id="subtract" onClick={() => handleQuantity("subtract")}>
								-
							</button>
							<span>{quantity}</span>
							<button id="add" onClick={() => handleQuantity("add")}>
								+
							</button>
						</div>
					</div>
					<div className="remove-button">
						<button id="remove" onClick={() => removeItemFromCart(product)}>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					</div>
				</div>
			</NavLink>
		</div>
	)
}

export default CartItem
