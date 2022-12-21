import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import Home from "./pages/home/home.component"
import Shop from "./pages/shop/shop.component"
import Authentication from "./pages/authentication/authentication.component"
import Product from "./pages/product/product.component"
import { UserProvider } from "./contexts/user.context"
import reportWebVitals from "./reportWebVitals"
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from "react-router-dom"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="/shop" element={<Shop />} />
			<Route path="/product/:productId" element={<Product />} />
			<Route path="/auth" element={<Authentication />} />
		</Route>
	)
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
