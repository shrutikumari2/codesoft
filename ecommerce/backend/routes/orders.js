const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { items, totalAmount, paymentMethod } = req.body;
  const order = new Order({ user: req.user._id, items, totalAmount });
  await order.save();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // Stripe expects amount in cents
    currency: 'usd',
    payment_method: paymentMethod,
    confirm: true,
  });

  order.paymentStatus = paymentIntent.status;
  await order.save();

  res.send(order);
});

router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.send(orders);
});

module.exports = router;
