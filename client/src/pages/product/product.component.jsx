import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import Alert from "../../components/alert/alert.component"
import Dropdown from "../../components/dropdown/dropdown.component"
import { VscChevronUp, VscChevronDown, VscChromeClose } from "react-icons/vsc"
import "./product.styles.scss"

import { getProductById } from "../../utils/firebase/firebase.utils"
import Button from "../../components/button/button.component"
import { CartContext } from "../../contexts/cart.context"

const Product = () => {
	const { productId } = useParams()
	const [productData, setProductData] = useState({})
	const [viewImage, setViewImage] = useState(false)
	const [quantity, setQuantity] = useState(1)
	const [show, setShow] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	/* const IMAGE_LIST = {
		white:
			"https://images.unsplash.com/photo-1608181831696-1f21b6e6e5e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
		lavender:
			"https://images.unsplash.com/photo-1659959342837-ab43b43a8074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
		beige:
			"https://images.unsplash.com/photo-1608181831718-2501832be3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	}
	const COLOR_LIST = ["white", "lavender", "beige"] */

	const [productPhoto, setProductPhoto] = useState("")

	const handleQuantityChange = (e) => {
		e.target.id === "add"
			? setQuantity((quantity) => quantity + 1)
			: quantity > 0 && setQuantity((quantity) => quantity - 1)
	}

	useEffect(() => {
		const getProductData = async () => {
			const response = await getProductById(productId)
			console.log(response)
			setProductData(response)
			setProductPhoto(response.images[0])
			setIsLoading(false)
		}
		getProductData()
	}, [])

	const { addItemToCart } = useContext(CartContext)
	const addToCart = () => {
		addItemToCart(productData, quantity)
		setShow(true)
		setTimeout(() => {
			setShow(false)
			setQuantity(1)
		}, 3000)
	}
	const { name, category, price, images, color, fragrance, weight } =
		productData

	//change structure for images
	/* const changeColor = (color) => {
		setProductColor(color)
		setProductPhoto(images[color])
	} */
	const scrollUp = () => {
		document.getElementById("row").scrollBy(0, -100)
	}
	const scrollDown = () => {
		document.getElementById("row").scrollBy(0, 100)
	}
	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			setViewImage(false)
		}
	})
	console.log(viewImage)
	return (
		<div className="container">
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="product-page-container">
					<div className="images-container">
						<div id="image-row">
							<button id="scroll-up" onClick={scrollUp}>
								<VscChevronUp />
							</button>
							<div className="row" id="row">
								{Object.values(images).map((image, key) => (
									<div
										id="slide-show-img"
										className={productPhoto === image ? "active" : ""}
										key={key}
										onClick={() => setProductPhoto(image)}
									>
										<img src={image} />
									</div>
								))}
							</div>
							<button id="scroll-down" onClick={scrollDown}>
								<VscChevronDown />
							</button>
						</div>
						<div className={`${viewImage ? "opened" : ""}`} id="main-image">
							{viewImage && (
								<div id="close-image" onClick={() => setViewImage(false)}>
									<VscChromeClose />
								</div>
							)}

							<img
								src={productPhoto}
								alt={`Image of ${name}`}
								onClick={() => setViewImage(true)}
							/>
						</div>
					</div>
					<div className="product-details">
						<header>
							<p id="product-name">{name}</p>
							<p id="price">Rs. {price}</p>
						</header>
						<section id="details">
							<p id="label">Category</p>
							<p id="value">{category}</p>
							<p id="label">Colour</p>
							<p id="value">{color}</p>
							<p id="label">Fragrance</p>
							<p id="value">{fragrance}</p>

							<p id="label">Weight</p>
							<p id="value">
								{weight} <span>g</span>
							</p>
						</section>
						<section className="buttons">
							<div id="quantity">
								<button id="subtract" onClick={handleQuantityChange}>
									-
								</button>
								<span>{quantity}</span>
								<button id="add" onClick={handleQuantityChange}>
									+
								</button>
							</div>

							<Button
								id="add-to-cart-button"
								onClick={addToCart}
								buttonType="primary"
							>
								Add to Cart
							</Button>
						</section>
					</div>
				</div>
			)}

			<Alert
				type="success"
				message={`Item added to cart. ( quantity : ${quantity} )`}
				show={show}
			/>
		</div>
	)
}

export default Product

//const [productColor, setProductColor] = useState("")
//const [productScent, setProductScent] = useState("")
//const [productScentError, setProductScentError] = useState("")
{
	/* <div className="colour-list">
								{colors.map((color, key) => (
									<div className="colour-item-container">
										<div
											className={`colour-container ${
												productColor === color ? "selected" : ""
											}`}
											style={{ backgroundColor: `${color}` }}
											onClick={() => changeColor(color)}
											key={key}
										></div>
										<p>{color}</p>
									</div>
								))}
							</div> */
}

{
	/* <div id="value">
								<Dropdown
									type="scent"
									setterFunc={setProductScent}
									options={scents}
									selectedOption={productScent}
								/>
								{productScentError && (
									<p className="error">Please select scent</p>
								)}
							</div> */
}
