DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER(10) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat-petter", "pets", 20, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("anti-aging skin cream", "skincare", 35, 30) ;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("decorative string lights", "home", 20, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("type-c cord", "electronics", 30, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "home", 28, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("frying pan", "kitchen", 29, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kitchen stool", "kitchen", 13, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cardigan", "clothing", 20, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("loveseat", "furniture", 299, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vacuum cleaner", "home", 125, 12);


select * from products;

SELECT product_name FROM products WHERE item_id = ?
