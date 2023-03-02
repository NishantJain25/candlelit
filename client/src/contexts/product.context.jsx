import { createContext, useEffect, useState } from "react"
import { getAllProducts } from "../utils/firebase/firebase.utils"

export const ProductContext = createContext({
	productList: [],
})

export const ProductProvider = ({ children }) => {
	const [productList, setProductList] = useState([])

	useEffect(() => {
		const getData = async () => {
			const productArray = await getAllProducts()
			setProductList(productArray)
		}
		getData()
	}, [])

	const value = { productList }

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	)
}
