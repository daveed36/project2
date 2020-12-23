// ====================
// DEPENDENCIES
// ====================
// -- packages and models
const express = require('express')
const Product = require('../models/products')
// -- config
const products = express.Router()

// ====================
// ROUTES
// ====================
// GET ROUTES
// -- index
products.get('/', (req, res) => {
    Product.find({}, (err, foundProducts) => {
        res.render('products/index.ejs', {
            products: foundProducts
        })
    })
})

// -- new
products.get('/new', (req, res) => {
    res.render('products/new.ejs')
})

// -- show
products.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('products/show.ejs', {
            product: foundProduct
        })
    })
})

// -- edit
products.get('/:id/edit', (req,res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('products/edit.ejs', {
            product: foundProduct
        })
    })
})

// ACTION ROUTES
// -- create
products.post('/', (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        res.redirect(`/products`)
    })
})

// -- update
products.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`)
        }
    )
})

// -- delete
products.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
        res.redirect('/products')
    })
})

// -- buy
products.put('/:id/buy', (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        { $inc: { qty: -1 } },
        { new: true },
        (err, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`)
        }
    )
})

// ====================
// EXPORT
// ====================
module.exports = products
