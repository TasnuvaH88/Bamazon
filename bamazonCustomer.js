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
    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log(JSON.stringify(results, null, 2));
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
         var chosenProd = answer.itemID;
         var quantity = answer.units;
         purchaseOrder(chosenProd, quantity);
       });
    })
}

function purchaseOrder (itemID, quantityWanted) {
            connection.query('SELECT * FROM Products WHERE item_id = ' + itemID,
            function(err, res) {
            if (err)throw err;
            if (parseInt(quantityWanted) <= res[0].stock_quantity) {
                var newQuant = res[0].stock_quantity - parseInt(quantityWanted)
                connection.query('UPDATE products SET ? WHERE ?',
                [
                    {
                      stock_quantity: newQuant
                    },
                    {
                      item_id: itemID
                    }
                  ], function(err) {
                    if (err) throw err;
                    console.log("Your order was successful!");
                    connection.end();
                     })
                    } else {
                    console.log("Sorry, we are out of stock! Please try again!");
                   itemList();
            }
        })
    };
    
    