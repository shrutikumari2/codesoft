import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CheckoutPage = () => {
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      return;
    }

    const res = await axios.post(
      '/api/orders',
      { items: cart, totalAmount, paymentMethod },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data.paymentStatus === 'succeeded') {
      alert('Payment successful!');
      localStorage.removeItem('cart');
      history.push('/');
    } else {
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total: ${totalAmount}</p>
      <input
        type="text"
        placeholder="Payment Method"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />
      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
