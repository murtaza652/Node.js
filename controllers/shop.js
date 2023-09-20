const Product = require('../models/product');
const Cart= require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([products, ignore]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch( err => {
    console.log(err)
  });
};
exports.getProduct=(req, res, next)=> {
  const prodId=req.params.ProdId;
  Product.fetchProduct(prodId)
  .then(([products]) =>  {
    console.log(products);
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([products, ignore]) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'shop',
      path: '/'
    });
  })
  .catch( err => {
    console.log(err)
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  const prodId=req.body.productId;
  Product.fetchProduct(prodId)
  .then(([products]) =>  {
    console.log(products);
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products.title,
      path: '/products'
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
