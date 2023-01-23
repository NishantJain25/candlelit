import { createContext, useEffect, useState } from "react"
import { getCategories } from "../utils/firebase/firebase.utils"

export const CategoryContext = createContext({
	categoriesList: [],
})

export const CategoryProvider = ({ children }) => {
	const [categoriesList, setCategoriesList] = useState([])

	useEffect(() => {
		const getData = async () => {
			const categoriesArray = await getCategories()
			console.log(categoriesArray)
			setCategoriesList(categoriesArray)
		}
		getData()
		
	}, [])

	const value = { categoriesList }

	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	)
}
