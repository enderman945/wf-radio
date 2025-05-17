const sqlite = require("better-sqlite3");

class SQLiteDatabase {
    
    constructor(config) {
        this.config = config;
        this.db = null;
      }

    async connect() {
        try {
            this.db = new sqlite("./data/sqlite.db");
            // this.db.pragma("journal_mode = WAL");
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

    // Runs with a result (ex: SELECT)
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

    // One time queries (ex: CREATE TABLE)
    async exec(sql) {
        try {
            return this.db.exec(sql);
        } catch (err) {
            console.error("Error executing statement:", err)}
            throw err;
    }

    // Queries with no results (ex: INSERT)
    async run(sql, params = []) {
        try {
            if (params.length > 0) {
                return this.db.prepare(sql).run(params);
            } else {
                return this.db.prepare(sql);
            }
        } catch (err) {
            console.error("Error executing prepared statement:", err)}
            throw err;
    }

    // Prepare a query for run or for transaction
    async prepare(sql) {
        try {
                return this.db.prepare(sql);
        } catch (err) {
            console.error("Error preparing statement:", err)}
            throw err;
    }

    // Run a prepared transaction
    async transaction(prepared_sql, items) {
        try {
             this.db.transaction((items) => {
                for (const item of items) prepared_sql.run(item);
             })
        } catch (err) {
            console.error("Error executing prepared statement:", err)}
            throw err;
    }    

    async exists(table, attribute, value) {
        try {
            return this.db.prepare(`SELECT COUNT(*) FROM ${table} WHERE ${attribute} = ?`).get(value)['COUNT(*)'] > 0;            
        } catch (err) {
            console.error("Error checking item existence");
            throw err;
        }
    }

}

module.exports = SQLiteDatabase;