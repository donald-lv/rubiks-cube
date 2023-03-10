const Pool = require("pg").Pool;
const fs = require("node:fs");

const { user, password, port } = JSON.parse(fs.readFileSync("config.json"));

const pool = new Pool({
    user: user,
    password: password,
    host: "localhost",
    database: "rubikscube"
});

module.exports = pool;
