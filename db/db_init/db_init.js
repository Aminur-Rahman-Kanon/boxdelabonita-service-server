const Pool = require('pg').Pool;
require('dotenv').config();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOSTNAME}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.PG_DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

// pool.connect((err) => {
//     if (err) throw err;
//     console.log('connected to postgresql database');
// })

module.exports = pool;
