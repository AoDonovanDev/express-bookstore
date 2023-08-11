/** Common config for bookstore. */
const secret = require('./secret')

let DB_URI = `postgresql://postgres:${secret}@`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `${DB_URI}/books-test`;
} else {
  DB_URI = process.env.DATABASE_URL || `${DB_URI}/bookstore`;
}


module.exports = { DB_URI };