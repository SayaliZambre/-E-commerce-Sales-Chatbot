CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

INSERT INTO products (name, description, price, stock, image_url)
VALUES
('Product 1', 'Description for product 1', 29.99, 10, 'https://via.placeholder.com/150'),
('Product 2', 'Description for product 2', 19.99, 20, 'https://via.placeholder.com/150'),
('Product 3', 'Description for product 3', 49.99, 5, 'https://via.placeholder.com/150');
