const Seq= require('sequelize');
const seq= new Seq("node", "root", "Murtaza1!",{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = seq;