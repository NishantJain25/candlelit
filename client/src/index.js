import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import Home from "./pages/home/home.component"
import Shop from "./pages/shop/shop.component"
import Authentication from "./pages/authentication/authentication.component"
import Product from "./pages/product/product.component"
import Category from "./pages/category/category.component"
import Cart from "./pages/cart/cart.component"
import About from "./pages/about/about.component"
import Account from "./pages/account/account.component"
import Contact from "./pages/contact/contact.component"
import Checkout from "./pages/checkout/checkout.component"
import ErrorPage from "./pages/error-page/error-page.component"

import { UserProvider } from "./contexts/user.context"
import { ProductProvider } from "./contexts/product.context"
import { CartProvider } from "./contexts/cart.context"
import { CategoryProvider } from "./contexts/category.context"
import reportWebVitals from "./reportWebVitals"
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<ErrorPage />}>
			<Route index element={<Home />} />
			<Route path="/shop" element={<Shop />} />
			<Route path="/categories/:category" element={<Category />} />
			<Route path="/product/:productId" element={<Product />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="/about" element={<About />} />
			<Route path="/account/*" element={<Account />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/auth" element={<Authentication />} />
			<Route path="/checkout" element={<Checkout />} />
		</Route>
	)
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<UserProvider>
			<CategoryProvider>
				<ProductProvider>
					<CartProvider>
						<RouterProvider router={router} />
					</CartProvider>
				</ProductProvider>
			</CategoryProvider>
		</UserProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
