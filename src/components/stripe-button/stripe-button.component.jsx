import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IXsG3CtKn8qKUHLtvJrZMZDs0HbtdHjTzY8QukSEqQoAItMt6nTbMXWvPoCSxku9Z6GA4ZX3v0LPLXKXVEzucO200eg66AGAR";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };
  //propertiest to access https://github.com/azmenak/react-stripe-checkout
  return (
    <StripeCheckout
      label="Pay Now"
      name="online store"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
