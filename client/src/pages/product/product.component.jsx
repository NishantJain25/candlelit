import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./product.styles.scss"
//import { products } from "../../products.jsx"
import {
	addCollectionsAndDocuments,
	getAllProducts,
} from "../../utils/firebase/firebase.utils"

const Product = () => {
	const { productId } = useParams()
	const [productData, setProductData] = useState({})

	useEffect(() => {
		const getProductData = async () => {
			const response = await getAllProducts(["id", "==", parseInt(productId)])
			console.log(response)
			setProductData(response[0])
		}
		getProductData()
	}, [])

	const { name, category, price, imageUrl, desc, color, scent } = productData
	return (
		<div className="product-page-container">
			<div className="images-container">
				<div id="image-row">
					<div id="slide-show-img"></div>
					<div id="slide-show-img"></div>
					<div id="slide-show-img"></div>
				</div>
				<div id="main-image">
					<img src={imageUrl} alt={`Image of ${name}`} />
				</div>
			</div>
			<div className="product-details">
				<header>
					<p id="product-name">{name}</p>

					<p id="description">
						{desc}{" "}
						lajdhladhladhlashalshdaldhlasjdhljahdlahdljahdjlahdjlahdslahsldha
						adsjlahd alsdjasld asdljhadla aldjhasldja asldjaldhalhsdj
						adjhaljdhaldjh
					</p>
					<p id="price">Rs. {price}</p>
				</header>
				<section id="details">
					<p id="label">Category</p>
					<p id="value">{category}</p>
					<p id="label">Colours</p>
					<div className="colour-list">
						<div
							className="colour-container "
							style={{ backgroundColor: "white" }}
						></div>
						<div
							className="colour-container selected"
							style={{ backgroundColor: "beige" }}
						></div>
					</div>
					<p id="label">Scent</p>
					<p id="value">{scent}</p>
				</section>
				<section className="buttons">
					<div id="quantity">
						<button>-</button>
						<span>0</span>
						<button>+</button>
					</div>

					<button id="add-to-cart-button">Add to Cart</button>
				</section>
			</div>
		</div>
	)
}

export default Product
