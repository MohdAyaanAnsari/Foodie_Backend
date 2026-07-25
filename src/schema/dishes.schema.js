import db from "../config/db.js";

const createDishesTable = async () => {
  const [tables] =  await db.execute(`SHOW TABLES LIKE 'dishes'`);

  const tablesExist = tables.length > 0;

  await db.execute(`
    CREATE TABLE IF NOT EXISTS dishes (
      id INT AUTO_INCREMENT PRIMARY KEY,

      name VARCHAR(150) NOT NULL,
      description TEXT,

      price DECIMAL(10,2) NOT NULL,
      discount DECIMAL(10,2) DEFAULT 0,

      category ENUM(
        'Indian',
        'Italian',
        'Mexican',
        'Chinese',
        'Korean',
        'Japanese'
      ) NOT NULL,

      food_type ENUM(
        'Veg',
        'Non Veg'
      ) NOT NULL,

      cook_time INT NOT NULL,

      image_url VARCHAR(255),

      is_available BOOLEAN DEFAULT TRUE,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
    );
  `);
  
  if(!tablesExist){
    console.log("✅ Dishes table ready");
  }
};

export default createDishesTable;