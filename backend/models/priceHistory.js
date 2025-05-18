/*
** EPITECH PROJECT, 2025
** eurozon-deal-finder [WSL: Ubuntu]
** File description:
** priceHistory
*/

const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  asin: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PriceHistory', priceSchema);
