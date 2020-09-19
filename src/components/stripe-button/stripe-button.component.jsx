import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HT9XaLiafA2T6JkMFywOL3KDLGTcGYz535QwrZCEhjlOUKDbWlkTRDZ5BRmmR9dWoho8NPRId8p3MCR6MeIGzRQ00umaNb0XS';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesful');
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='The Spot Clothing'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
         />
    );
};

export default StripeCheckoutButton;