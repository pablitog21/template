// En el archivo db.js en el directorio services
const { Pool } = require('pg');

// URL de conexión a tu base de datos PostgreSQL
const connectionString = 'postgresql://sso_dev_admin:123456@database-vortexbird.c8dq5oiucrly.us-east-1.rds.amazonaws.com:5432/sso_dev';

// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
    const pool = new Pool({
      connectionString: connectionString,
    });
    await pool.connect();
    console.log('Conexión a la base de datos establecida');
    return pool; // Devuelve la instancia del pool de conexiones
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Puedes manejar este error según tus necesidades
  }
}

module.exports = { connectToDatabase };

