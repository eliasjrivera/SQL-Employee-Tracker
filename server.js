// import/require packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table')
require('dotenv').config();

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);

// inquirer prompt and switch statment with code blocks to be executed
const init = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'start',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add An Employee',
                    'Update An Employee Role',
                    'Exit'
                ]
            }
        ]).then(ans => {
            switch (ans.start) {
                case 'View All Departments': showDepartment();
                    break;
                case 'View All Roles': showRoles();
                    break;
                case 'View All Employees': showEmployees();
                    break;
                case 'Add A Department': addDepartment();
                    break;
                case 'Add A Role': addRole();
                    break;
                case 'Add An Employee': addEmployee();
                    break;
                case 'Update An Employee Role': updateEmployee();
                    break;
                case 'Exit':
                    console.log('Thank you!');
                    process.exit();
            }
        }).catch(err => console.error(err));
}

init();

// shows all departments
const showDepartment = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};

// shows all roles
const showRoles = () => {
    db.query(`SELECT * FROM role`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};

// shows all employees
const showEmployees = () => {
    db.query(`SELECT * FROM employee`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
};

// adds a department
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department you wouldd like to add?',
                name: 'addDepartment'
            }
        ]).then(ans => {
            db.query(`INSERT INTO department(name)
                    VALUES(?)`, ans.addDepartment, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM department`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        init();
                    })
                }
            }
            )
        })
};

// adds a role
const addRole = () => {
    const departmentChoices = () => db.promise().query(`SELECT * FROM department`)
        .then((rows) => {
            let arrNames = rows[0].map(obj => obj.name);
            return arrNames
        })
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the title of the role you would like to add?',
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: 'Which department is this role in?',
                name: 'addDepartment',
                choices: departmentChoices
            }
        ]).then(ans => {
            db.promise().query(`SELECT id FROM department WHERE name = ?`, ans.addDepartment)
                .then(answer => {
                    let mappedId = answer[0].map(obj => obj.id);
                    return mappedId[0]
                })
                .then((mappedId) => {
                    db.promise().query(`INSERT INTO role(title, salary, department_id)
                VALUES(?, ?, ?)`, [ans.roleTitle, ans.roleSalary, mappedId]);
                    init()
                })
        })
    };

// adds an employee
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: 'firstName'
            },
            {
                type: "input",
                message: 'What is the employees last name?',
                name: 'lastName'
            },
        ]).then(ans => {
            db.query(`INSERT INTO employee(first_name, last_name)
                    VALUES(?, ?)`, [ans.firstName, ans.lastName], (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM employee`, (err, results) => {
                        err ? console.error(err) : console.table(results);
                        init();
                    })
                }
            }
            )
        })
};