-- db/migration/V1__create_tables.sql

START TRANSACTION;

-- Create the Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
);

-- Create the Tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    priority INT DEFAULT 0,
    deadline DATE DEFAULT NULL
);

COMMIT;
