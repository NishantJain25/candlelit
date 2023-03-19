import { initializeApp } from "firebase/app"

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	where,
} from "firebase/firestore"

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
} from "firebase/auth"

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyBMcYl13tBMvn6rmfG8q-1mdKVS_lf5VA4",
	authDomain: "candlelit-dc08b.firebaseapp.com",
	projectId: "candlelit-dc08b",
	storageBucket: "candlelit-dc08b.appspot.com",
	messagingSenderId: "152910063548",
	appId: "1:152910063548:web:2e375edf35fa89aeebedb9",
	measurementId: "G-KENY142NS0",
}

//Initialize firebase
const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app);
const db = getFirestore(app)

const auth = getAuth(app)
const storage = getStorage(app)

export const addCollectionsAndDocuments = async (
	collectionKey,
	objectToAdd
) => {
	const collectionRef = collection(db, collectionKey)
	const batch = writeBatch(db)

	objectToAdd.forEach((object) => {
		const docRef = doc(collectionRef)
		batch.set(docRef, object)
	})
	await batch.commit()
	console.log("done")
}

export const addImageToStorage = async (category, productImg, productName) => {
	console.log(category)
	const categoryRef = ref(storage, `product-images/${category}/${productName}`)
	const uploadTask = uploadBytesResumable(categoryRef, productImg)

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			console.log("Progress: ", progress)

			switch (snapshot.state) {
				case "paused":
					console.log("Upload is paused")
					break
				case "running":
					console.log("Upload is running")
					break
			}
		},
		(error) => {
			console.log(error.message)
		},
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
				console.log("file available at ", downloadUrl)
				return downloadUrl
			})
		}
	)
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await createUserWithEmailAndPassword(auth, email, password)
}

export const createUserDocFromAuth = async (
	userAuth,
	cartItems,
	additionalInfo = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, "users", userAuth.uid)
	const userSnapshot = await getDoc(userDocRef)

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			})

			await createCart(userAuth.uid, cartItems)
		} catch (error) {
			console.error("Error creating user: ", error)
		}
	}
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await signInWithEmailAndPassword(auth, email, password)
}

export const getUser = async (uid) => {
	if (!uid) return

	try {
		const docRef = doc(db, "users", uid)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return docSnap.data()
		} else {
			return null
		}
	} catch (error) {
		console.log(error)
	}
}

export const updateUser = async (userID, userData) => {
	if (!userID) return

	try {
		const docRef = doc(db, "users", userID)
		await updateDoc(docRef, userData)
	} catch (error) {
		console.log(error)
	}
}
export const signUserOut = async () => {
	await signOut(auth)
}

export const forgotPassword = (email) => {
	return sendPasswordResetEmail(auth, email)
}
export const onAuthStateChangeListener = (callback) => {
	onAuthStateChanged(auth, callback)
}

export const getAllProducts = async (filters = []) => {
	const productsRef = collection(db, "products")

	const q =
		filters.length > 0
			? query(productsRef, where(...filters))
			: query(productsRef)
	try {
		const querySnapshot = await getDocs(q)
		const products = querySnapshot.docs.reduce((arr, docSnapshot, index) => {
			arr[index] = { ...docSnapshot.data(), id: docSnapshot.id }
			return arr
		}, [])
		return products
	} catch (error) {
		console.log(error)
	}
}

export const getProductById = async (id) => {
	const productRef = doc(db, "products", id)

	try {
		const docSnap = await getDoc(productRef)
		if (docSnap.exists()) {
			return docSnap.data()
		}
	} catch (error) {
		console.log(error)
	}
}

export const createCart = async (userID, cartData) => {
	const collectionRef = collection(db, "cart")
	const docRef = doc(collectionRef, userID)

	try {
		await setDoc(docRef, cartData)
	} catch (err) {
		console.log(err)
	}
}
export const getUserCart = async (userID) => {
	try {
		const docRef = doc(db, "cart", userID)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return docSnap.data()
		} else {
			return null
		}
	} catch (err) {
		console.log(err)
	}
}
export const updateUserCart = async (userID, cartItems) => {
	if (!userID) return

	try {
		const docRef = doc(db, "cart", userID)
		await updateDoc(docRef, { cartItems })
	} catch (error) {
		console.log(error)
	}
}

export const getCategories = async () => {
	var categoriesList = []
	try {
		const querySnapshot = await getDocs(collection(db, "categories"))
		querySnapshot.forEach((doc) => {
			categoriesList.push(doc.data())
		})

		return categoriesList
	} catch (error) {
		console.log(error)
	}
}

export const getCategoryFromDatabase = async (category) => {
	const collectionRef = collection(db, "categories")
	const docRef = doc(collectionRef)
	const q = query(collectionRef, where("name", "==", category))
	try {
		const querySnapshot = await getDocs(q)
		const categoryData = querySnapshot.docs.reduce(
			(arr, docSnapshot, index) => {
				arr[index] = docSnapshot.data()
				return arr
			},
			[]
		)
		console.log(categoryData[0])
		return categoryData[0]
	} catch (err) {
		console.log(err)
	}
}

export const addMessageToDatabase = async (messageInfo) => {}
