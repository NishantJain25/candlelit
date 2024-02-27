import React, { useContext, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, NavLink } from "react-router-dom"
import ProductCard from "../../components/product-card/product-card.component"
import Button from "../../components/button/button.component"
import { CategoryContext } from "../../contexts/category.context"
import { selectProductList } from "../../store/product/product.selector"
import { setProductList } from "../../store/product/product.action"
import {
	addCollectionsAndDocuments,
	getAllProducts,
} from "../../utils/firebase/firebase.utils"
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx"
import LandingImage1 from "../../assets/product-images/bubble-vanilla.jpeg"
import LandingImage2 from "../../assets/product-images/couple-lavender.jpg"
import aboutImage1 from "../../assets/product-images/pillar-lavender.jpg"
import aboutImage2 from "../../assets/product-images/swirl-lavender.jpg"
import "./home.styles.scss"

const Home = () => {
	const { categoriesList } = useContext(CategoryContext)
	const productList = useSelector(selectProductList)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onNavigateHandler = () => navigate("/shop")

	const leftScroll = () => {
		document.getElementById("category-list").scrollBy(-500, 0)
	}
	const rightScroll = () => {
		document.getElementById("category-list").scrollBy(500, 0)
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		const getData = async () => {
			const productArray = await getAllProducts()
			dispatch(setProductList(productArray))
		}
		getData()
	}, [])
	return (
		<div className="home-container">
			<section className="home-section" id="landing-page">
				<div
					className="background-image-1"
					style={{
						background: `url(${LandingImage1})`,
						backgroundPosition: "top",
						backgroundSize: "cover",
						backgroundBlendMode: "screen",
					}}
				></div>

				<h1 className="display-1">Light A Candle</h1>
				<Button buttonType="primary" onClick={onNavigateHandler}>
					Shop now
				</Button>
			</section>
			<section id="home-about">
				<div className="home-about-images">
					<div id="image-1">
						<img src={aboutImage1} alt="pillar candle" />
					</div>
					<div id="image-2">
						<img src={aboutImage2} alt="swirl candle" />
					</div>
				</div>
				<div className="home-about-text">
					<h1>Looking For A Way To Relax After A Long Day?</h1>
					<p>Lighting a scented candle can help you relieve stress.</p>
				</div>
			</section>
			<section id="home-explore">
				<header>
					<h1>Explore</h1>
					<p>Check out the different types of candles.</p>
				</header>
				<div id="separator" />
				<div className="explore-container" id="explore-container">
					<button id="left" onMouseDown={leftScroll}>
						<RxDoubleArrowLeft />
					</button>
					<div className="category-list" id="category-list">
						{categoriesList ? (
							categoriesList.map((category) => (
								<NavLink
									to={`/categories/${category.name}`}
									className="category-link"
								>
									<div
										className="category-container"
										style={{
											background: `url(${category.imageUrl}) rgba(0,0,0,0.2) `,
											backgroundPosition: "center",
											backgroundSize: "cover",
											backgroundBlendMode: "multiply",
										}}
									>
										<h2>{category.name}</h2>
									</div>
								</NavLink>
							))
						) : (
							<p>Loading...</p>
						)}
					</div>
					<button id="right" onMouseDown={rightScroll}>
						<RxDoubleArrowRight />
					</button>
				</div>
			</section>
			<section id="home-shop">
				<header>
					<h1>Our Shop</h1>
					<p>
						Browse through our catalogue to find the perfect candles for you
					</p>
				</header>
				<div id="separator" />
				<div className="home-shop-container">
					{productList &&
						productList
							.filter((_, index) => index < 5)
							.map((product, index) => (
								<ProductCard key={index} product={product} />
							))}
					<button id="view-shop-button" onClick={onNavigateHandler}>
						View Shop
					</button>
				</div>
			</section>
		</div>
	)
}

export default Home
