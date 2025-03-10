class SQLiteDatabase {
    constructor(config) {
        const sqlite = require("better-sqlite3");
        this.config = config;
        this.db = null;
      }

    async connect() {
        try {
            const db = new sqlite("./data/sqlite.db")
            // db.pragma("journal_mode = WAL")
            console.log("Connected to SQLite");
        } catch (err) {
            console.error("Error connecting to SQLite database: ", err);
            process.exit(1);
        }
    }

    async close() {
        if (this.db && this.db.open) {
            this.db.close();
            console.debug("Closed database connection");
          }
    }

    async query(sql, params = []) {
        try {
            if (params.length > 0) {
              return this.db.prepare(sql).all(params);
            } else {
              return this.db.prepare(sql).all();
            }
        } catch (err) {
            console.error("Error executing query: ", err);
            throw err;
        }
    }

}

module.exports = SQLiteDatabase;