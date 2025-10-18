-- Create database and use it
CREATE DATABASE IF NOT EXISTS db_express_api
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE db_express_api;

-- Tables
CREATE TABLE IF NOT EXISTS consoles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  model VARCHAR(50) NOT NULL,
  `condition` VARCHAR(50) NOT NULL,
  daily_price DECIMAL(10,2) NOT NULL,
  status ENUM('available','rented','maintenance') NOT NULL DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_consoles_status (status)
);

CREATE TABLE IF NOT EXISTS rentals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  console_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  status ENUM('active','returned','cancelled') NOT NULL DEFAULT 'active',
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rentals_console (console_id),
  INDEX idx_rentals_status (status),
  CONSTRAINT fk_rentals_console FOREIGN KEY (console_id) REFERENCES consoles(id)
);


-- Seed sample consoles
INSERT INTO consoles (model, `condition`, daily_price, status)
VALUES
  ('Switch OLED', 'Like New', 50000.00, 'available'),
  ('Switch V2', 'Good', 35000.00, 'available');

-- Optional: create dedicated app user (uncomment and adjust password)
-- CREATE USER IF NOT EXISTS 'switch_app'@'%' IDENTIFIED BY 'change-me-strong-pass';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON db_express_api.* TO 'switch_app'@'%';
-- FLUSH PRIVILEGES;
