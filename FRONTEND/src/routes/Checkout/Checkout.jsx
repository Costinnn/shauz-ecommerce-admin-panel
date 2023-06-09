import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

import { emptyCart } from "../../redux/cart";

import checkoutCart from "../../assets/global/checkout-cart.png";
import arrowDown from "../../assets/global/arrow-down.png";

import "./Checkout.scss";

const Checkout = () => {
  const navigate = useNavigate();
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState(false);
  const { products, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // STATE for updating DATABASE fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [orderedProducts, setOrderedProducts] = useState([]);

  // COMPONENT UPDATE FUNCTIONS
  const handleOrderOpen = () => {
    if (isOrderOpen) {
      setIsOrderOpen(false);
    } else {
      setIsOrderOpen(true);
    }
  };

  useEffect(() => {
    const order = products.map((item) => {
      return {
        _id: item._id,
        title: item.title,
        orderedQ: item.cartQ,
        orderedSize: item.cartSize,
        price: item.price,
      };
    });
    setOrderedProducts(order);
  }, []);

  //SEND ORDER ON EMAIL FUNCTION
  const sendOrderEmail = async (order) => {
    try {
      const response = await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        order,
        import.meta.env.VITE_PROD_ID
      );
      if (response) {
        console.log("Order sent on email!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //  DATABASE ADD FUNCTION
  const addOrderToDb = async (newOrder) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SEND_ORDER,
        newOrder
      );
      if (response) {
        console.log(response.data);
        console.log("Order added with success!");
        setSuccessOrder(true);
        dispatch(emptyCart({}));
        setTimeout(() => {
          setSuccessOrder(false);
          navigate("/");
        }, 7000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //SEND ORDER MAIN FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      fullName,
      phone,
      email,
      county,
      city,
      postalCode,
      street,
      number,
      otherInfo,
      orderedProducts,
      orderValue: total,
    };

    await addOrderToDb(newOrder);
    await sendOrderEmail(newOrder);

    setFullName("");
    setPhone("");
    setEmail("");
    setCounty("");
    setCity("");
    setPostalCode("");
    setStreet("");
    setNumber("");
    setOtherInfo("");
  };

  return (
    <main className="section-narrow checkout">
      <h1>CHECKOUT</h1>
      <div className="show-hide-btn" onClick={handleOrderOpen}>
        <div>
          <img src={checkoutCart} alt="" />
          <p>Detalii comanda</p>
          <img
            src={arrowDown}
            alt=""
            className={`arrow ${isOrderOpen ? "rotate" : ""}`}
          />
        </div>
        <span>{total + 20} lei</span>
      </div>
      <div className="box">
        <div className={`order-summary ${isOrderOpen ? "is-open" : ""}`}>
          <div className="products-container">
            {products.map((product) => (
              <div className="product" key={product._id + product.cartSize}>
                <div className="product-info">
                  <img src={product.images[0]} alt="shauz" />
                  <div>
                    <h5 className="product-title">{product.title}</h5>
                    <span className="product-quantity">
                      {product.cartQ} / {product.cartSize}
                    </span>
                  </div>
                </div>
                <span className="product-price">{product.price} lei</span>
              </div>
            ))}
          </div>
          <div className="order-info">
            <span>Subtotal</span>
            <span>{total} lei</span>
          </div>
          <div className="order-info">
            <span>Livrare</span>
            <span>20 lei</span>
          </div>
          <div className="order-total">
            <span>TOTAL</span>
            <span>{total + 20} lei</span>
          </div>
          <Link to="/cart" className="button3">
        INAPOI LA COS
      </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <span>Contact</span>

          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            required
            placeholder="Nume-Prenume*"
          />

          <div className="input-box">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              required
              placeholder="Telefon*"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="E-mail*"
            />
          </div>
          <span>Adresa livrare</span>
          <input
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            type="text"
            required
            placeholder="Judet*"
          />
          <div className="input-box dif-size">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              required
              placeholder="Localitate*"
            />
            <input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              type="text"
              placeholder="Cod postal"
            />
          </div>
          <div className="input-box dif-size">
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              type="text"
              required
              placeholder="Strada*"
            />
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              required
              placeholder="Nr.*"
            />
          </div>
          <textarea
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            name="message"
            id="message"
            wrap="hard"
            cols="35"
            rows="3"
            placeholder="Informatii suplimentare..."
          ></textarea>

          <button
            className={`button2 ${successOrder ? "btn-order" : ""}`}
            disabled={successOrder}
          >
            {successOrder ? "COMANDA PLASATA" : "TRIMITE COMANDA"}
          </button>
        </form>
      </div>

      <Link to="/cart" className="button3">
        INAPOI LA COS
      </Link>
    </main>
  );
};

export default Checkout;
