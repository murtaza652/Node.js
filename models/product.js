const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id)
      {
        const existingProductsIndex = products.findIndex(p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductsIndex]=this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }
      else{
        this.id=Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
      
    });
  }
  
  static deleteById(id) {
    getProductsFromFile(products => {
      const newProducts=products.filter(p => p.id!==id);
      fs.writeFile(p, JSON.stringify(newProducts), err => {
        console.log(err);
    });
  });
};

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  
  static fetchProduct(id, cb) {
    getProductsFromFile(products => {
      cb(products.find(p => p.id === id));
    });
  };
};
