const { Pool } = require('pg');
const fs = require('fs');


class Database {
  constructor() {
    const dbHost = process.env.DB_HOST || 'localhost';
    const isLocalhost = dbHost === 'localhost' || dbHost === '127.0.0.1' || dbHost === 'db';
    
    // SSL configuration for Aiven (and other cloud databases)
    let sslConfig = false;
    if (!isLocalhost || process.env.DB_SSL === 'true') {
      // If CA certificate path is provided, use it
      if (process.env.DB_CA_CERT_PATH) {
        try {
          sslConfig = {
            ca: fs.readFileSync(process.env.DB_CA_CERT_PATH).toString(),
            rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
          };
        } catch (error) {
          console.warn('Warning: Could not read CA certificate file, using default SSL config');
          sslConfig = {
            rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
          };
        }
      } else {
        // Default SSL config for Aiven (typically requires SSL but may use self-signed certs)
        sslConfig = {
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
          require: true
        };
      }
    }

    this.pool = new Pool({
      host: dbHost,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'library_db',
      ssl: sslConfig,
    });
  }

  /**
   * Изпълнява SQL заявка към базата данни.
   * @param {string} text - SQL заявка
   * @param {Array} params - параметри за заявката
   * @returns {Promise<import('pg').QueryResult>}
   */
  async query(text, params) {
    return this.pool.query(text, params);
  }

  /** Затваря connection pool. */
  async close() {
    await this.pool.end();
  }
}

// Singleton — една инстанция за цялото приложение
module.exports = new Database();
