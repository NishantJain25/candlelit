import React, { useState, useContext } from "react"
import CheckoutDetails from "../../components/checkout-details/checkout-details.component"
import CheckoutProduct from "../../components/checkout-product/checkout-product.component"
import AddressForm from "../../components/address-form/address-form.component"
import Button from "../../components/button/button.component"
import { CartContext } from "../../contexts/cart.context"
import { UserContext } from "../../contexts/user.context"
import { VscAdd, VscChromeMinimize } from "react-icons/vsc"
import "./checkout.styles.scss"

const Checkout = () => {
	const [showDetails, setShowDetails] = useState(true)
	const { cartItems, cartAmount, cartCount } = useContext(CartContext)
	const { currentUser } = useContext(UserContext)
	
	return (
		<div className="checkout-contaienr">
			<div className="checkout-grid">
				<section className="information">
					<div className="information-container">
						<p id="title">Delivery Address</p>
						<AddressForm />
					</div>
					<div className="information-container">
						<p id="title">Payment Method</p>
					</div>
				</section>
				<section className="order-summary">
					<div className="order-summary-container">
						<p id="title">Your Order</p>
						<CheckoutDetails cartAmount={cartAmount} quantity={cartCount} />
						<div
							className="accordian-div"
							onClick={() => setShowDetails((currentState) => !currentState)}
						>
							<p>View Order Details</p>
							{showDetails ? <VscChromeMinimize /> : <VscAdd />}
						</div>
						<div
							className="cart-items"
							style={{ height: `${showDetails ? "" : "0px"}` }}
						>
							{cartItems.map((item, key) => (
								<CheckoutProduct cartItem={item} key={key} />
							))}
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default Checkout
