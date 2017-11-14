var mysql = require("mysql");
var inquirer = require('inquirer');
var bodyparse = require('body-parser');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "tasnuva",
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    itemList();
});


var itemList = function () {
    connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
    console.log(JSON.stringify(results, null, 2));
 
    start();
    })
};

var start = function() {
   inquirer
    .prompt([
        {
        name: "itemID",
        type: "input",
        message: "What is the ID of the product you are purchasing?",
       }, {
        name: "units",
        type: "input",
        message: "How many units do you want?",
       }
       ]).then(function(answer){
        connection.query("SELECT * FROM products",  function(err, results){
            if (err) throw err;
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
              if (results[i].item_ID === answer.itemID) {
                chosenItem = results[i];
              }
            }
    
            var updateQuery = 'UPDATE products SET stock_quantity = ' + (chosenItem.stock_quantity - answer.units) 
            + ' WHERE item_id = ' + answer.itemID;
            if (answer.units <= results.stock_quantity) { 
                connection.query(updateQuery, function(err, data) {
                     if (err) throw err;               
                     console.log("Order has been placed!"); 
                    });
           } else{ 
                console.log("Sorry, we do not have enough stock for the amount you would like.");
                };
            })
        })
     };


  
        
