require("dotenv").config();
const { Pool } = require("pg");

//connectionString: process.env.DB_CONNECTION,
const pool = new Pool({
 connectionString:process.env.DB
});

async function init() {
    const client = await pool.connect();
    await client.query({
      text: `
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        nombre VARCHAR(40) NOT NULL,
        apellido VARCHAR(40) NOT NULL,
        foto VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS autos (
        id SERIAL PRIMARY KEY ,
        marca VARCHAR(255) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        year INTEGER,
        imagen VARCHAR(255) NOT NULL,
        id_usuario INTEGER REFERENCES usuarios(id)NOT NULL
    );
    
      `,
    });
    client.release();
  }
  
module.exports = { pool, init };
  