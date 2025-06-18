CREATE TABLE animals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  age INT,
  health VARCHAR(100),
  intake_date DATE,
  adopted ENUM('Y', 'N') DEFAULT 'N'
);

CREATE TABLE adopters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(30),
  email VARCHAR(100) NOT NULL
);

CREATE TABLE adoptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id INT NOT NULL,
  adopter_id INT NOT NULL,
  adoption_date DATE NOT NULL,
  FOREIGN KEY (animal_id) REFERENCES animals(id),
  FOREIGN KEY (adopter_id) REFERENCES adopters(id)
);

-- Seleccionar la base de datos
USE protectora;

-- Tabla de animales
CREATE TABLE IF NOT EXISTS animals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  age INT,
  health VARCHAR(100),
  intake_date DATE,
  adopted ENUM('Y', 'N') DEFAULT 'N'
);

-- Datos de ejemplo para animales
INSERT INTO animals (name, species, breed, age, health, intake_date, adopted) VALUES
('Luna', 'Perro', 'Labrador', 3, 'Buena', '2023-10-01', 'N'),
('Milo', 'Gato', 'Siames', 2, 'Excelente', '2023-11-15', 'Y'),
('Rocky', 'Perro', 'Bulldog', 5, 'Regular', '2024-01-10', 'N');

-- Tabla de adoptantes
CREATE TABLE IF NOT EXISTS adopters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(30),
  email VARCHAR(100) NOT NULL
);

-- Datos de ejemplo para adoptantes
INSERT INTO adopters (full_name, address, phone, email) VALUES
('María López', 'Calle Mayor 12', '612345678', 'maria@example.com'),
('Carlos Pérez', 'Av. Libertad 45', '698765432', 'carlos@example.com');

-- Tabla de adopciones
CREATE TABLE IF NOT EXISTS adoptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id INT NOT NULL,
  adopter_id INT NOT NULL,
  adoption_date DATE NOT NULL,
  FOREIGN KEY (animal_id) REFERENCES animals(id),
  FOREIGN KEY (adopter_id) REFERENCES adopters(id)
);

-- Datos de ejemplo para adopciones
INSERT INTO adoptions (animal_id, adopter_id, adoption_date) VALUES
(2, 1, '2024-02-20');