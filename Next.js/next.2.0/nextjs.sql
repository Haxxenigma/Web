DROP DATABASE IF EXISTS nextjs;
CREATE DATABASE IF NOT EXISTS nextjs;
USE nextjs;
CREATE USER IF NOT EXISTS 'nextUser' @'%' IDENTIFIED BY 'n3xtUs3rSup3rS3cr3tP455w0rd!';
GRANT ALL PRIVILEGES ON *.* TO 'nextUser' @'%';
FLUSH PRIVILEGES;
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(255) UNIQUE NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    birth DATE,
    image NVARCHAR(255) DEFAULT '/media/default_image.svg',
    bio TEXT,
    verified BOOL NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS Articles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    author NVARCHAR(255) NOT NULL,
    title NVARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);