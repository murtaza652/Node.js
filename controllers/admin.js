const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(()=>{
    res.redirect('/');
  })
  .catch(err=>{
    console.log(err)
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode)
  {
    return res.redirect('/');
  }
  const prodId=req.params.prodId;
  req.user.getProducts({where: {id:prodId}})
  .then(products=>  {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product:products[0]
      });
  });
}

exports.postEditProduct = (req, res, next) => {
  const prodId=req.body.prodId;
  const updatedTitle=req.body.title;
  const updatedImageUrl=req.body.imageUrl;
  const updatedPrice=req.body.price;
  const updatedDesc=req.body.description;
  Product.findByPk(prodId)
  .then((product)=>{
    product.title = updatedTitle,
    product.description = updatedDesc,
    product.price = updatedPrice,
    product.imageUrl = updatedImageUrl
    product.save();
  })
  .then(result=> {
    console.log(result);
    res.redirect('/admin/products');
  })
  .catch(err=>{
    console.log(err)
  });
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Productshop',
      path: '/admin/products'
    })
  })
  .catch(err => {
    console.log(err);
  });
};

exports.deleteProduct = (req, res, next) => {
  const prodId=req.body.prodId;
  Product.findByPk(prodId)
  .then((product) =>{
    product.destroy();
    res.redirect('/admin/products');
  })
  .catch(err =>{
    console.log(err);
  });
}