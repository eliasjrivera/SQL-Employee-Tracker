// import and require inquirer and mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

require('dotenv').config();

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'process.env.DB_PASSWORD',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

// inquirer prompt with answer choices and callbacks
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'Start',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role'
            ]
        },
])
    .then((data) => {
      // const answers = data;

      if (data === 'View All Departments') {
        viewDepartments();
      } 

      if (data === 'View All Roles') {
        viewRoles();
      }

      if (data === 'View All Employees') {
        viewEmployees();
      }

      if (data === 'Add A Department') {
        addDepartment();
      }

      if (data === 'Add A Role') {
        addRole();
      }

      if (data === 'Add An Employee') {
        addEmployee();
      }

      if (data === 'Update An Employee Role') {
        updateEmployee();
      }
  });


viewDepartments = () => {};
viewRoles = () => {};
viewEmployees = () => {};
addDepartment = () => {};
addRole = () => {};
addEmployee = () => {};
updateEmployee = () => {};