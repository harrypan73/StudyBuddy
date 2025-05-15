const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});

// Test database connection
async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('PostgreSQL database connected:', res.rows[0].now); // Log the current timestamp
    } catch (err) {
        console.error('Error connecting to database:', err.message);  // Log any errors
    }
}

testConnection(); // Call the test connection function

async function createUser(username, email, password) {
    console.log("Attempting to create user with username: ", username, " and email: ", email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
    const values = [username, email, hashedPassword];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

async function getUserByEmail(email) {
    console.log("Querying for user with email: ", email);
    const query = ('SELECT * FROM users WHERE email = $1');
    const values = [email];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

async function getUserById(id) {
    console.log("Querying for user with id: ", id);
    const query = ('SELECT * FROM users WHERE id = $1');
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

module.exports = { pool, createUser, getUserByEmail, getUserById };