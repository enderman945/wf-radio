const sqlite = require("better-sqlite3");

class SQLiteDatabase {
    constructor(config) {
        this.config = config;
        this.db = null;
      }

    async connect() {
        try {
            this.db = new sqlite("./data/sqlite.db");
            // db.pragma("journal_mode = WAL");
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
            console.error("Error executing prepared query:", err);
            throw err;
        }
    }

    async exec(sql) {
        try {
            return this.db.exec(sql);
        } catch (err) {
            console.error("Error executing statement:", err)}

    }

    async prepare(sql, params = []) {
        try {
            if (params.length > 0) {
                return this.db.prepare(sql).run(params);
            } else {
                return this.db.prepare(sql);
            }
        } catch (err) {
            console.error("Error executing prepared statement:", err)}
    }

    async exists(table, attribute, value) {
        try {
            return this.db.prepare(`SELECT COUNT(*) FROM ${table} WHERE ${attribute} = ?`).get(value)['COUNT(*)'] > 0;            
        } catch (err) {
            console.error("Error checking item existence");
        }
    }

}

module.exports = SQLiteDatabase;