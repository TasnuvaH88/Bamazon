var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "tasnuva",
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n")
    runSearch();
});

var runSearch = function() {
    inquirer
      .prompt([
          {
          
        name: "itemID",
        type: "input",
        message: "What is the ID of the product you are purchasing?"
       }, {
        name: "units",
        type: "input",
        message: "How many units do you want?"
    }]).then(function(answer){
        var query = 'SELECT * FROM products WHERE ?';
        var item = answer.itemID;
        var units = answer.units;
        connection.query(query, {item_id: item}, function(err, data) {
            if (err) throw err;
        
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				runSearch(); 
                if (units <= data.stock_quantity) {
					
                    var updateQuery = 'UPDATE products SET stock_quantity = ' + (data.stock_quantity - quantity) 
                    + ' WHERE item_id = ' + item;
                    console.log('updateQuery = ' + updateQuery);
                    connection.end();
					connection.query(updateQuery, function(err, data) {
                        if (err) throw err
                        console.log("Order has been placed!");
                            
					}) 
                } else {
                    connection.end()
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.')
                    runSearch();

                }
            })
        })
    };
    




      
  




/*Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.*/