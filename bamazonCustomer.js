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

//Initiates connection and logs sucess. Proceeds to the selectOrder() function.
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    selectOrder();
});


//Displays all the items and prompts user to select item ID and quantity.
//It then runs the promise and captures each answer in variables which 
//are then passed as parameters to the purchaseOrder() function.
var selectOrder = function () {
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

//Handles the SQL queries based on answers received in selectOrder() function
//Does basic calculations and compares the customer quantity selection to 
//quantity available as per bamazonDB. 
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
                    console.log("Order was successful! Your total order is: $" + quantityWanted * res[0].price + "!");
                    connection.end();
                     })
                    } else {
                    console.log("Sorry, we are out of stock! Please try again!");
                    selectOrder();
            }
        })
    };
    
    