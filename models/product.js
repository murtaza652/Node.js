const fs=require("fs");
const path=require("path");
const p=path.join(path.dirname(process.mainModule.filename),"Data","product.json");  
const getProduct = cb=>{
    fs.readFile(p,(err,fileContent) => {
        if(err)
        {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}
module.exports = class Product {
    constructor(name)
    {
        this.title=name;
    }
    
    save(){
        getProduct((products)=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products), err => {
            console.log(err);})
            }
        );
    }

    static fetchAll(cb){
        getProduct(cb);
    }
}