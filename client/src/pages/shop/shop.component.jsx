import React, { useState, useEffect } from "react"
import ProductCard from "../../components/product-card/product-card.component"
//import { products } from "../../products.jsx"
import "./shop.styles.scss"
import { getAllProducts } from "../../utils/firebase/firebase.utils"
const category_list = ["All", "Bubble", "Cylinder", "Sphere"]
const Shop = () => {
	const [category, setCategory] = useState("All")
	const [products, setProducts] = useState([])
	useEffect(() => {
		const getData = async () => {
			const productArray = await getAllProducts()

			setProducts(productArray)
		}
		getData()
	}, [])

	useEffect(() => {
		category !== "All"
			? setProducts(products.filter((product) => product.category == category))
			: setProducts(products)

		console.log(category)
	}, [category])

	console.log(products)
	const updateCategory = (category) => {
		setCategory(category)
	}

	return (
		<div className="shop-container">
			<header className="shop-header">
				<h1>Shop</h1>
			</header>
			<aside className="category-list">
				<h3>Categories</h3>
				{category_list.map((category) => (
					<button id="category" onClick={() => updateCategory(category)}>
						{category}
					</button>
				))}
			</aside>
			<section className="shop-items">
				<div className="shop-items-container">
					{products.map((product, key) => (
						<ProductCard key={key} product={product} />
					))}
				</div>
			</section>
		</div>
	)
}

export default Shop
