import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import ProductCard from "../../components/product-card/product-card.component"
import "./shop.styles.scss"
import { selectProductList } from "../../store/product/product.selector"

const category_list = [
	"All",
	"Bubble",
	"Mini Bubble",
	"Couple",
	"Pillar",
	"Shell",
	"Swirl",
	"Teddy Bear",
]
const Shop = () => {
	const [filteredCategory, setFilteredCategory] = useState("")
	const [products, setProducts] = useState([])
	const productList = useSelector(selectProductList)

	useEffect(() => {
		window.scrollTo(0, 0)
		filteredCategory !== "All"
			? setProducts(
					productList.filter((product) =>
						product.category.includes(filteredCategory)
					)
			  )
			: setProducts(productList)
	}, [productList, filteredCategory])

	const updateCategory = (category) => {
		setFilteredCategory(category)
	}

	return (
		<div className="container">
			<div className="shop-container">
				<header className="shop-header">
					<h1>Shop</h1>
				</header>
				<div className="items-container">
					<aside className="category-list">
						<h3>Categories</h3>
						<div className="category-buttons">
							{category_list.map((category, key) => (
								<button
									id="category"
									className={
										category === filteredCategory ? "active-category" : ""
									}
									onClick={() => updateCategory(category)}
									key={key}
								>
									{category}
								</button>
							))}
						</div>
					</aside>
					<section className="shop-items">
						<div className="shop-items-container">
							{products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default Shop
