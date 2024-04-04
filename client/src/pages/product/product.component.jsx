import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { addItemToCart } from "../../store/cart/cart.action";
import { useParams } from "react-router-dom";
import Alert from "../../components/alert/alert.component";
import Dropdown from "../../components/dropdown/dropdown.component";
import {
  VscChevronUp,
  VscChevronDown,
  VscChromeClose,
  VscChromeMinimize,
  VscAdd,
  VscChevronRight,
  VscChevronLeft
} from "react-icons/vsc";
import "./product.styles.scss";

import { getProductById } from "../../utils/firebase/firebase.utils";
import Button from "../../components/button/button.component";
import Loader from "../../components/loader/loader.component";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const [productData, setProductData] = useState({});
  const [viewImage, setViewImage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  /* const IMAGE_LIST = {
		white:
			"https://images.unsplash.com/photo-1608181831696-1f21b6e6e5e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
		lavender:
			"https://images.unsplash.com/photo-1659959342837-ab43b43a8074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
		beige:
			"https://images.unsplash.com/photo-1608181831718-2501832be3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	}
	const COLOR_LIST = ["white", "lavender", "beige"] */

  const [productPhoto, setProductPhoto] = useState("");
  //const [showDetails, setShowDetails] = useState(false);


  const getWindowDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window
    return {
      width,
      height
    }
  }

  const [windowDimentions, setWindowDimentions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowDimentions(getWindowDimensions())
    }
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  },[])

  const handleQuantityChange = (e) => {
    e.target.id === "add"
      ? setQuantity((quantity) => quantity + 1)
      : quantity > 0 && setQuantity((quantity) => quantity - 1);
  };



  useEffect(() => {
    const getProductData = async () => {
      const response = await getProductById(productId);
      setProductData({ ...response, id: productId });
      setProductPhoto(response.images[0]);
      setIsLoading(false);
    };
    getProductData();
  }, []);

  const addToCart = () => {
    dispatch(addItemToCart(currentUser, cartItems, productData, quantity));
    setShow(true);
    setTimeout(() => {
      setShow(false);
      setQuantity(1);
    }, 3000);
  };
  const { name, category, price, images, color, fragrance, weight } =
    productData;

  //change structure for images
  /* const changeColor = (color) => {
		setProductColor(color)
		setProductPhoto(images[color])
	} */
  const scrollUp = () => {
    document.getElementById("row").scrollBy(0, -100);
  };
  const scrollDown = () => {
    document.getElementById("row").scrollBy(0, 100);
  };
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setViewImage(false);
    }
  });

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-page-container">
          <div className="images-container">
            <div id="image-row">
              <button id="scroll-up" onClick={scrollUp}>
              {windowDimentions.width > 786 ? <VscChevronUp /> : <VscChevronLeft />}
              </button>
              <div className="row" id="row">
                {Object.values(images).map((image, key) => (
                  <div
                    id="slide-show-img"
                    className={productPhoto === image ? "active" : ""}
                    key={key}
                    onClick={() => setProductPhoto(image)}
                  >
                    <img src={image} />
                  </div>
                ))}
              </div>
              <button id="scroll-down" onClick={scrollDown}>
                {windowDimentions.width > 786 ? <VscChevronDown /> : <VscChevronRight />}
              </button>
            </div>
            <div className={`${viewImage ? "opened" : ""}`} id="main-image">
              {viewImage && (
                <div id="close-image" onClick={() => setViewImage(false)}>
                  <VscChromeClose />
                </div>
              )}

              <img
                src={productPhoto}
                alt={`Image of ${name}`}
                onClick={() => setViewImage(true)}
              />
            </div>
          </div>
          <div className="product-details">
            <header>
              <p id="product-name">{name}</p>
              <p id="price">Rs. {price}</p>
            </header>
            <section id="details">
              <p id="label">Category</p>
              <p id="value">{category}</p>
              <p id="label">Colour</p>
              <p id="value">{color}</p>
              <p id="label">Fragrance</p>
              <p id="value">{fragrance}</p>

              <p id="label">Weight</p>
              <p id="value">
                {weight} <span>g</span>
              </p>
            </section>
            <section className="buttons">
              <div id="quantity">
                <button id="subtract" onClick={handleQuantityChange}>
                  -
                </button>
                <span>{quantity}</span>
                <button id="add" onClick={handleQuantityChange}>
                  +
                </button>
              </div>

              <Button
                id="add-to-cart-button"
                onClick={addToCart}
                buttonType="primary"
              >
                Add to Cart
              </Button>
            </section>

            <div className="extra-info">
              <p id="extra-info-heading">About the candle making process</p>

              <p id="extra-info-body">
                Our candles are purely made of soy wax. Each candle contains a
                lead-free cotton wick, as well as phthalate-free fragrance oils.
                Our candles are always hand-poured in small batches, ensuring
                only the highest quality for our customers!
              </p>
            </div>
          </div>
        </div>
      )}

      <Alert
        type="success"
        message={`Item added to cart. ( quantity : ${quantity} )`}
        show={show}
      />
    </div>
  );
};

export default Product;

//const [productColor, setProductColor] = useState("")
//const [productScent, setProductScent] = useState("")
//const [productScentError, setProductScentError] = useState("")
{
  /* <div className="colour-list">
								{colors.map((color, key) => (
									<div className="colour-item-container">
										<div
											className={`colour-container ${
												productColor === color ? "selected" : ""
											}`}
											style={{ backgroundColor: `${color}` }}
											onClick={() => changeColor(color)}
											key={key}
										></div>
										<p>{color}</p>
									</div>
								))}
							</div> */
}

{
  /* <div id="value">
								<Dropdown
									type="scent"
									setterFunc={setProductScent}
									options={scents}
									selectedOption={productScent}
								/>
								{productScentError && (
									<p className="error">Please select scent</p>
								)}
							</div> */
}






// Product page
// https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FCouple%2FCouple.jpg?alt=media&token=691fe548-5d5d-4240-b2ff-f4d7b93c9a77

// Product card
// https://firebasestorage.googleapis.com/v0/b/candlelit-dc08b.appspot.com/o/product-images%2FCouple%2FCouple?alt=media&token=8619c516-7075-4c99-8d6b-0a80a6e14184