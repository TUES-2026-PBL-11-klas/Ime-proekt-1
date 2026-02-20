const { Pool } = require('pg');


class Database {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'library_db',
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
