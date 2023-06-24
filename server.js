// import and require inquirer and mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'process.en.DB_PASSWORD',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);