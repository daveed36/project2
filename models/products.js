// ====================
// DEPENDENCIES
// ====================
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// ====================
// SCHEMA
// ====================
const productSchema = Schema({
    name: { type: String, required: true },
    description: String,
    img: String,
    price: { type: Number, min: 0 },
    qty: { type: Number, min: 0 },
    freeDelivery : Boolean
})

// ====================
// EXPORT
// ====================
const Product = mongoose.model('Product', productSchema)
module.exports = Product
