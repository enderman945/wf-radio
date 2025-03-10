class Database {

    async connect() {
        throw new Error("Not implemented");
    }

    async close() {
        throw new Error("Not implemented");
    }

    async query(sql, params) {
        throw new Error("Not implemented");
    }
}

class SQLiteDatabase extends Database {
    constructor(config) {
        super();
        const sqlite3 = require("sqlite3").verbose();
        const { open } = require("sqlite");
        this.config = config;
      }

    async connect() {
        this.db = await open({
            filename: this.config.file_path,
            driver: sqlite3.Database,
          });
          console.log("Connected to SQLite");
        }

    async close() {
        await this.db.close();
    }

    async query(sql, params) {
        throw new Error("Not implemented");
    }
    
}

class MySQLDatabase extends Database {
    constructor(config) {
        super();
        const mysql = require("mysql2/promise");
        this.config = config;
      }
    

    async connect() {
        this.db = await mysql.createConnection({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
          });
          console.log("Connected to MySQL");
    }

    async close() {
        await this.db.end();
    }

    async query(sql, params) {
        throw new Error("Not implemented");
    }
}


function connectDatabase(config) {
    if (config.type === "mysql") {
      return new MySQLDatabase(config);
    } else if (config.type === "sqlite") {
      return new SQLiteDatabase(config);
    } else {
      throw new Error("Invalid database type: ", config.type);
    }
}
  



module.exports = { Database, MySQLDatabase, SQLiteDatabase };
module.exports = { connectDatabase };