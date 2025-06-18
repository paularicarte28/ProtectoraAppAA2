DROP TABLE IF EXISTS adoptions;
DROP TABLE IF EXISTS adopters;
DROP TABLE IF EXISTS animals;

CREATE TABLE animals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  species VARCHAR(50),
  breed VARCHAR(50),
  age INT,
  health VARCHAR(50),
  intake_date DATE,
  adopted CHAR(1) DEFAULT 'N'
);

CREATE TABLE adopters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  address VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(100)
);

CREATE TABLE adoptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id INT NOT NULL,
  adopter_id INT NOT NULL,
  adoption_date DATE NOT NULL,
  FOREIGN KEY (animal_id) REFERENCES animals(id),
  FOREIGN KEY (adopter_id) REFERENCES adopters(id)
);

INSERT INTO animals (name, species, breed, age, health, intake_date, adopted)
VALUES ('Luna', 'Perro', 'Labrador', 4, 'Sano', '2024-05-01', 'N');

INSERT INTO adopters (full_name, address, phone, email)
VALUES ('Carlos Martínez', 'Calle Falsa 123', '600000000', 'carlos@mail.com');
