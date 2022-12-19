// Update with your config settings.

// get data from .env
const {
  MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS, MYSQL_NAME
} = process.env;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "db_api_mahasiswa"
    },
    migrations: {
       directory: "./databases/migrations"
    },
    seeds: {
      directory: "./databases/seeders"
    }

  },

};
