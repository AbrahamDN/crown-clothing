import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51H4CcuJ7sxej5uzTn6LlpThK2QD8tcpwF6Cmb3Y7vSJXnPepH4kzL1ZRpNZWrxdglG42mLoLIkmaK4q0JKziJjaM00IxhhytP9';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(response => {
        alert('Payment was sucessful');
      })
      .catch(error => {
        console.log('Payment error: ', JSON.parse(error));
        alert(
          `There was an issue with your payment. 
          Please make sure you use the provided credit card`
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Crwn Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
