import React, { useState, useEffect, useContext } from "react"
import ProductCard from "../../components/product-card/product-card.component"
import "./shop.styles.scss"
import { ProductContext } from "../../contexts/product.context"

const category_list = ["All", "Bubble", "Cylinder", "Sphere"]
const Shop = () => {
	const [category, setCategory] = useState("")
	const [products, setProducts] = useState([])
	const { productList } = useContext(ProductContext)

	useEffect(() => {
		window.scrollTo(0, 0)
		category !== "All"
			? setProducts(
					productList.filter((product) => product.category.includes(category))
			  )
			: setProducts(productList)
	}, [productList, category])

	const updateCategory = (category) => {
		setCategory(category)
	}

	return (
		<div className="container">
			<div className="shop-container">
				<header className="shop-header">
					<h1>Shop</h1>
				</header>
				<aside className="category-list">
					<h3>Categories</h3>
					<div className="category-buttons">
						{category_list.map((category) => (
							<button id="category" onClick={() => updateCategory(category)}>
								{category}
							</button>
						))}
					</div>
				</aside>
				<section className="shop-items">
					<div className="shop-items-container">
						{products.map((product, key) => (
							<ProductCard key={key} product={product} />
						))}
					</div>
				</section>
			</div>
		</div>
	)
}

export default Shop
