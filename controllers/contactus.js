const Contact=require('../models/contactus');

exports.contact= (req, res, next) => {
    res.render('contactus', {
        pageTitle: 'contactus',
        path: '/contactus',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
};
exports.success =(req, res, next) => {
    const contacts=new Contact(req.body.name, req.body.email);
    contacts.save();
    res.render('success', {
        pageTitle: 'success',
        path: '/contactus/success',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
};