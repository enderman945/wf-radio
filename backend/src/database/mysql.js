class MySQLDatabase {
    constructor(config) {
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
        throw new Error("Not implemented"); //TODO
        const [results] = await this.db.execute(sql, params);
        return results;
    }
}  


module.exports = MySQLDatabase;