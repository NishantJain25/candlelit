import { USER_ACTION_TYPES } from "./user.types"
import { useSelector } from "react-redux"
import { selectCartItems } from "../cart/cart.selector"
import {
	getUserCart,
	updateUserCart,
} from "../../utils/firebase/firebase.utils"

export const setCurrentUser = (user,cartItems) => {

	return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user }
}
