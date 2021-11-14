import logo from "./logo.svg";
import "./App.css";
import StripeChekout from "react-stripe-checkout";
import { useState } from "react";

function App() {
  const [product, setProduct] = useState({
    name: "React Course",
    price: 10,
    productBy: "Atik Hasan",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    fetch("https://fathomless-taiga-25630.herokuapp.com/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        const { status } = res;
        console.log("Status = ", status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <StripeChekout
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={makePayment}
          name={product.name}
          amount={product.price * 100}
          shippingAddress
          billingAddress
        />
      </header>
    </div>
  );
}

export default App;
