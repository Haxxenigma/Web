const mysql = require('mysql2/promise');

module.exports = async function createMySQLConnection() {
    const connection = await mysql.createConnection({
        host: '172.22.175.120',
        user: 'haxxe',
        password: 'H4xxen1gm405MySQL',
        database: 'nodejs'
    });

    connection.connect();

    return connection;
}

/*
CREATE DATABASE IF NOT EXISTS nodejs;
USE nodejs;
CREATE USER IF NOT EXISTS 'haxxe' @'%' IDENTIFIED BY 'H4xxen1gm405MySQL';
GRANT ALL PRIVILEGES ON nodejs.* TO 'haxxe' @'%';
FLUSH PRIVILEGES;
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(255) UNIQUE NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    birth_date DATE,
    user_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title NVARCHAR(255) NOT NULL,
    author NVARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    thumbnail TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author) REFERENCES users(name) ON UPDATE CASCADE
);
*/