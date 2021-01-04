const express = require('express')
const Product = require('../models/products')
const products = express.Router()


const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}


// INDEX
products.get('/', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render('products/index.ejs', {
      products: allProducts
      ,currentUser: req.session.currentUser
    })
  })
})

// -- new
products.get('/new',isAuthenticated, (req, res) => {
    res.render('products/new.ejs'
    , {currentUser: req.session.currentUser}
  )
})


// -- show
products.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('products/show.ejs', {
            product: foundProduct
            ,currentUser: req.session.currentUser
        })
    })
})
// -- edit
products.get('/:id/edit',isAuthenticated, (req,res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('products/edit.ejs', {
            product: foundProduct
            ,currentUser: req.session.currentUser
        })
    })
})
// ACTION ROUTES
// products.use(isAuthenticated)
// -- create
products.post('/', isAuthenticated,(req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        res.redirect(`/product/new`)
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
products.delete('/:id',isAuthenticated, (req, res) => {
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



// SEED ROUTE
products.get('/setup/seed', (req, res) => {
  Product.create(
    [
        {
          name: '3D FACE ROLLER',
          description: 'Let our face roller help prep your skin the right way. From de-puffing to calming and contouring. The roller helps promote lymphatic drainage and enhances blood circulation. GlorialSkin™ Face Roller is also known for its calming properties and aids self-love! .',
          img: '//cdn.shopify.com/s/files/1/0428/7804/2265/files/7_H4b39f5e5695a42a79a76d692e1b679b8E_600x_adbe3027-3ed7-4326-9a43-d06699b20d21_5000x.png?v=1596223946 5000w',
          price: 5,
          qty: 99
        },
        {
          name: 'LED Light Therapy',
          description: 'Great anti-aging benefits because of its ability to stimulate collagen and elastin production..',
          img: '//cdn.shopify.com/s/files/1/0428/7804/2265/products/tila-led-skin-therapy-latestechs-844682_1200x.jpg?v=1598296833',
          price: 35,
          qty: 549,
        },
        {
          name: 'SILICONE FACIAL CLEANSING BRUSH',
          description: 'Silicone Facial Cleansing Brush is a facial cleansing massager that uses sonic pulses and hundreds of soft silicone bristles that reach deep into your pores to remove acne-causing impurities, soften skin, and reduce signs of aging.',
          img: '//cdn.shopify.com/s/files/1/0428/7804/2265/files/Untitled_design_2_800x_946b7f86-1c97-4d0d-8feb-4cc137191ac0_5000x.png?v=1596224069 5000w',
          price: 25,
          qty: 398
        }

    ],
    (error, data) => {
      res.redirect('/products')
    }
  )
})

// Drop DB Route
products.get(
  '/dropdatabase/cannotundo/areyoursure/reallysure/okthen',
  (req, res) => {
    Product.collection.drop()
    res.send('You did it! You dropped the database!')
  }
)

module.exports = products
