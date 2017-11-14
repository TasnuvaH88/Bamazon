# Bamazon 
###**Introduction:**
####The goal of this project was to create an application using Node.js to connect to a mySQL database called "bamazonDB", which contains 10 items with varying prices and quantities. The basic functionality is as follows:
1. User connects to bamazonDB and is view the entire table.
2. User specifies item wanted using it's ID.
3. User specifies quantity wanted.
4. Application checks to see if quantity wanted is available or not.
5. If user enters more than what is in stock, application lets the user know it is not available and closes the connection.
6. If user enters less than what is in stock, application will calculate the cost, update the item's quantity in the database, lets the user know the total cost of the order and lastly, closes the connection.
####BamazonDB contains a basic table called "Product". This table has 5 columns, as seen below: 
![picture of initial table values](https://github.com/TasnuvaH88/Bamazon/blob/master/initProdTable.jpg)
####For this application, I used the following packages: **mySQL, Inquirer, body-parser**
[picture of code](https://github.com/TasnuvaH88/Bamazon/blob/master/code.jpg)
Starting out, I have connected to the host and database and saved it into a variable for further usage and options available through the mySQL package. It then connects to the database, turns the JSON object into a readable string, and it is then logged to the terminal so that the user can see their selections. Finally, it proceeds to run the selectOrder function.
[second part] (https://github.com/TasnuvaH88/Bamazon/blob/master/codetwo.jpg)
The function **selectOrder** contains the logic for grabbing the user's input. I used the inquirer package to prompt the user for the item ID and quantity, and then, I saved their answers to variables for easy reference. The variables are then passed as parameters into the **purchaseOrder** function.
[third part] (https://github.com/TasnuvaH88/Bamazon/blob/master/code3.png) 
In the final part of the code, the purchaseOrder function is defined with the parameters of itemID and quantityWanted. This function does the following:
1. Utilizes the mySQL package to query the database. In the first parameter, I constructed a mySQL statement which will retrieve all the products where the item id is set to the item id specified by the user's answers given in the selectOrder function. The item id is unique so only one product will be selected. The second parameter gives instructions on how to handle the response.
2. The if-then statement checks to see if the user's specified quantity is less than the available quantity. It is first turned into an integer so the types are matched and can be compared. The response object is an array which contains just one item at index 0. 
3. For the sake of readability, I created a new variable to reflect the user's purchase by subtracting the quantity. Note that this is only done if the conditional statement is true. 
4. Another query is made. The statement passed is an update to the table. The question marks in the sql statement are replaced with the keys passed in below it. The key values are the updated quantity amount, and the item's id. 
5. It then logs out the total and ends the connection. If the conditional statement is false, it will let the user know and restart selectOrder function.

**Below are images of how it functions for the user:**

[node image] (https://github.com/TasnuvaH88/Bamazon/blob/master/nodepart1.jpg) 
When the program is run, the user receives an object with all the available products listed.
[node image2] (https://github.com/TasnuvaH88/Bamazon/blob/master/node2.png) 
[node image3] (https://github.com/TasnuvaH88/Bamazon/blob/master/node3.png) 
As you can see, it calculated 3 vacuum cleaners (item 10) at $125 each. It logged the success and ended the connection to the database.
[updated DB] (https://github.com/TasnuvaH88/Bamazon/blob/master/node4.jpg) 




