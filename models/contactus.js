const fs=require("fs");
const path=require("path");
const p=path.join(path.dirname(process.mainModule.filename),"Data","contact.json");
const contact=[];
module.exports = class Contact {
    constructor(name, email)
    {
        this.name=name;
        this.email=email;
    } 
    save(){
        fs.readFile(p,(err,fileContent) => {
            if(!err)
            {
                contact.push(JSON.parse(fileContent));
            }
            contact.push(this);
            fs.writeFile(p,JSON.stringify(contact), err => {
                console.log(err);
            });
        });

    }
}