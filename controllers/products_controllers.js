const express = require('express')
const Product = require('../models/products')
const products = express.Router()


// const isAuthenticated = (req, res, next) => {
//   if (req.session.currentUser) {
//     return next()
//   } else {
//     res.redirect('/sessions/new')
//   }
// }

// products.use(isAuthenticated)
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



// SEED ROUTE
products.get('/setup/seed', (req, res) => {
  Product.create(
    [
        {
          name: 'Isabelle',
          description: 'Isabelle is friendly, polite, hardworking, and eager to help the player in any tasks she can assist with.',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MAAA-USZ-F0(0)001.png',
          price: 5,
          qty: 99
        },
        {
          name: 'Tom Nook',
          description: 'Tom Nook is a tanuki with brown fur. He has half-closed, blue eyes with a dark brown, mask-like patch of fur around them. The tip of his nose, his paws, tail, and ears are dark brown.',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MAAB-USZ-F0(0)002.png',
          price: 7000,
          qty: 1
        },
        {
          name: 'Sable',
          description: 'Sable\'s life is very focused around the world she grew up in- she is happy with the slow pace of the country life and has proven to be firm friends with others from the village, most notably, Tom Nook. She has low self-confidence and is an introverted person.',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MAAD-USZ-F0(0)004.png',
          price: 25,
          qty: 0
        },
        {
          name: 'Redd',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MAAM-USZ-F0(0)012.png',
          description: 'Redd, also known as Crazy Redd and Jolly Redd, is an untrustworthy kitsune, or fox',
          qty: 5,
          price: 1000000
        },
        {
          name: 'Pascal',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MAAK-USZ-F0(0)010.png',
          description: 'Pascal is a philosophical nomad who spends his days traveling the seven seas (or as he would put it, the one connected sea), talking to strangers, and eating scallops',
          price: 17,
          qty: 72
        },
        {
          name: 'Saharah',
          img: 'hhttps://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MAAN-USZ-F0(0)013.png',
          description: 'Saharah is a camel in the Animal Crossing series that trades in rare carpets and wallpaper to the player',
          price: 887,
          qty: 0
        },
        {
          name: 'Bob',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MAAT-USZ-F0(0)018.png',
          description: 'Bob is a lazy cat villager who has appeared in every game of the Animal Crossing series. His name is most likely based off the bobcat.',
          price: 6,
          qty: 913462
        },
        {
          name: 'Fauna',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MAAU-USZ-F0(0)019.png',
          description: 'Fauna has a normal personality, and frequently acts kind towards the player.',
          price: 3199,
          qty: 14
        },
        {
          name: 'Bluebear',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MABH-USZ-F0(0)032.png',
          description: 'As her name suggests, Bluebear is a light-blue bear. She has dark blue hair and a white-tipped muzzle and paws, complete with white inside her ears with a dark blue outside. She has dark, wide eyes and light pink blush.',
          price: 49.99,
          qty: 49
        },
        {
          name: 'Kiki',
          img: 'https://animal-crossing.com/amiibo/assets/img/cards/NVL-C-MABK-USZ-F0(0)034.png',
          description: 'Kiki is a black cat with yellow eyes and black pupils. Her ears are bright magenta inside, and she has a pushed up, pudgy nose.',
          price: 1,
          qty: 54
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
