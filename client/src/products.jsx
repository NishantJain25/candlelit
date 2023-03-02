const today = new Date()
const yyyy = today.getFullYear()
let mm = today.getMonth() + 1 // Months start at 0!
let dd = today.getDate()

if (dd < 10) dd = "0" + dd
if (mm < 10) mm = "0" + mm

const dateAdded = dd + "/" + mm + "/" + yyyy

export const categories = [
	{
		id: 1,
		name: "Mini Bubble",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 2,
		name: "Bubble",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 3,
		name: "Teddy Bear",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 4,
		name: "Shell",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 5,
		name: "Swirl",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 6,
		name: "Couple",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 7,
		name: "Pillar",
		imageUrl: "",
		desc: "",
		items: [],
	},
	/* {
		id: 8,
		name: "Peony Flower",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 9,
		name: "Arch",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 10,
		name: "Twirl",
		imageUrl: "",
		desc: "",
		items: [],
	},
	{
		id: 11,
		name: "Flower mini",
		imageUrl: "",
		desc: "",
		items: [],
	}, */
]

export const products = [
	{
		name: "Lavender Bubble",
		price: 250,
		weight: 150,
		color: "Lavender",
		fragrance: "Lavender",
		category: "Bubble",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FBubble%2Fbubble-lavender.jpg?alt=media&token=74c07deb-cc13-4547-926e-6f16ec9af15f",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Vanilla Bubble",
		price: 250,
		weight: 150,
		color: "White",
		fragrance: "Vanilla",
		category: "Bubble",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FBubble%2Fbubble-vanilla.jpg?alt=media&token=783e92af-6581-4a7a-a02c-db656e20d5f9",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Rose Bubble",
		price: 250,
		weight: 150,
		color: "Pink",
		fragrance: "Rose",
		category: "Bubble",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FBubble%2FBubble?alt=media&token=bd52fccb-f1c5-4467-9a3f-ef92f9d129af",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Lemongrass Bubble",
		price: 250,
		weight: 150,
		color: "Green",
		fragrance: "Lemongrass",
		category: "Bubble",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FBubble%2Fbubble-lemongrass.jpg?alt=media&token=d7a80de8-790f-48ce-9c4b-3023972d0133",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Lavender Couple",
		price: 600,
		weight: 175,
		color: "Lavender",
		fragrance: "Lavender",
		category: "Couple",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FCouple%2FCouple?alt=media&token=8619c516-7075-4c99-8d6b-0a80a6e14184",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Vanilla Mini Bubble",
		price: 80,
		weight: 40,
		color: "White",
		fragrance: "Vanilla",
		category: "Mini Bubble",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FMini%20Bubble%2FMini%20Bubble?alt=media&token=c34eafd9-0381-4503-b147-41268348ebf9",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Lavender Pillar",
		price: 450,
		weight: 250,
		color: "Lavender",
		fragrance: "Lavender",
		category: "Pillar",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FPillar%2Fpillar-lavender.jpg?alt=media&token=9124c032-a76e-41f5-a0f2-9848d7cfa00a",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Vanilla Pillar",
		price: 450,
		weight: 250,
		color: "White",
		fragrance: "Vanilla",
		category: "Pillar",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FPillar%2FPillar?alt=media&token=2a148ba1-495a-4b40-8336-0ee921ce9bc2",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Vanilla Shell",
		price: 350,
		weight: 120,
		color: "White",
		fragrance: "Vanilla",
		category: "Shell",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FShell%2Fshell-vanilla.jpg?alt=media&token=d6356d54-c449-42b5-9f09-99ee11858d43",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Lavender Shell",
		price: 350,
		weight: 120,
		color: "Lavender",
		fragrance: "Lavender",
		category: "Shell",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FShell%2Fshell-lavender.jpg?alt=media&token=80a44127-2e90-4ba3-889d-cc32bc48df9b",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Rose Shell",
		price: 350,
		weight: 120,
		color: "Pink",
		fragrance: "Rose",
		category: "Shell",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FShell%2Fshell-rose.jpg?alt=media&token=895c1871-3ebe-4331-8283-cfde8bbaa4a1",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Lemongrass Shell",
		price: 350,
		weight: 120,
		color: "Green",
		fragrance: "Lemongrass",
		category: "Shell",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FShell%2FShell?alt=media&token=aa5c906f-7344-4ccf-bbec-fcfff58eccd4",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Lavender Swirl",
		price: 230,
		weight: 80,
		color: "Lavender",
		fragrance: "Lavender",
		category: "Swirl",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FSwirl%2FSwirl?alt=media&token=d6c5073e-b0be-4938-b67c-e3bb8cb85797",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Lavender Teddy",
		price: 200,
		weight: 50,
		color: "Lavender",
		fragrance: "Lavender",
		category: "Teddy Bear",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FTeddy%20Bear%2Fteddy-bear-lavender.jpg?alt=media&token=ce9193df-af0c-4ddb-bb35-bc6bab59acf0",
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FTeddy%20Bear%2Fteddy-bear-lavender-2.jpg?alt=media&token=bfc8904c-3c39-49ff-b0c2-2dd018220100",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Lemongrass Teddy",
		price: 200,
		weight: 50,
		color: "Green",
		fragrance: "Lemongrass",
		category: "Teddy Bear",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FTeddy%20Bear%2Fteddy-bear-lemongrass.jpg?alt=media&token=1fded132-6b95-4790-a62d-ec82e7499257",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Vanilla Teddy",
		price: 200,
		weight: 50,
		color: "White",
		fragrance: "Vanilla",
		category: "Teddy Bear",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FTeddy%20Bear%2Fteddy-bear-vanilla.jpg?alt=media&token=26c338d5-e0da-4d2f-9cc4-8f0d4d9658b4",
		],
		dateAdded: dateAdded,
	},
	{
		name: "Rose Teddy",
		price: 200,
		weight: 50,
		color: "Pink",
		fragrance: "Rose",
		category: "Teddy Bear",
		images: [
			"https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FTeddy%20Bear%2FTeddy%20Bear?alt=media&token=5b7d487a-5959-4608-993b-4d1dafd09cd8",
		],
		dateAdded: dateAdded,
	},
]
