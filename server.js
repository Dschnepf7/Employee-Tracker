const express = require('express');
const inquirer = require('inquirer');
//import and require console.table
const cTable = require('console.table');


// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'rootroot',
    database: 'database_db'
  },
  console.log(`Connected to database.`)
);

// db.query('SELECT * FROM employee', function (err, results) {
//     console.log(results);
//   });


  const mainMenuOptions = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
  ];
  
  // Define the inquirer questions for adding a department
  const addDepartmentQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:',
    },
  ];
  
  // Define the inquirer questions for adding a role
  const addRoleQuestions = [
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'number',
      name: 'department_id',
      message: 'Enter the department ID for the role:',
    },
  ];
  
  // Define the inquirer questions for adding an employee
  const addEmployeeQuestions = [
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the employee\'s first name:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the employee\'s last name:',
    },
    {
      type: 'number',
      name: 'role_id',
      message: 'Enter the role ID for the employee:',
    },
    {
      type: 'number',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee:',
    },
  ];
  
  // Define the inquirer questions for updating an employee's role
  const updateEmployeeRoleQuestions = [
    {
      type: 'number',
      name: 'employee_id',
      message: 'Enter the ID of the employee to update:',
    },
    {
      type: 'number',
      name: 'new_role_id',
      message: 'Enter the new role ID for the employee:',
    },
  ];
  

  inquirer.prompt({
    type: 'list',
    name: 'mainMenuChoice',
    message: 'What would you like to do?',
    choices: mainMenuOptions,
  })
  .then((answer) => {
    // Handle the selected main menu option
    switch (answer.mainMenuChoice) {
      case 'View all departments':
        // Code to view all departments
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
  });

        break;
      case 'View all roles':
        // Code to view all roles
        db.query('SELECT * FROM role', function (err, results) {
            console.table(results);
      });
        break;
      case 'View all employees':
        // Code to view all employees
        db.query('SELECT * FROM employee', function (err, results) {
            console.table(results);
      });
        break;
      case 'Add a department':
        // Prompt the user for the department name and add it to the database
        inquirer.prompt(addDepartmentQuestions)
        .then((answer) => {
          // Code to add a department
        });
        break;
      case 'Add a role':
        // Prompt the user for the role information and add it to the database
        inquirer.prompt(addRoleQuestions)
        .then((answer) => {
          // Code to add a role
        });
        break;}})