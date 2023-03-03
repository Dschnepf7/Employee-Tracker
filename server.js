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
      type: 'input',
      name: 'department',
      message: 'Enter the department for the role:',
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
      type: 'input',
      name: 'manager_name',
      message: 'Enter the manager for the employee:',
    },
  ];
  
  // Define the inquirer questions for updating an employee's role
  const query = 'SELECT CONCAT(first_name, " ", last_name) AS name FROM employee';
  
  // db.query(query, (error, results) => {
  //   if (error) throw error;
  //   const employeeNames = results.map(result => result.name);
    
 
    const updateEmployeeRoleQuestions =[
    {
      type: 'input',
      name: 'employeeName',
      message: 'Select the employee to update:',
      // choices: employeeNames,
    },
    {
      type: 'input',
      name: 'new_role_id',
      message: 'Enter the new role for the employee:',
    },
  ] 
// });


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
          db.query(`INSERT INTO department (department_name) VALUES("${answer.name}")`, function (err, results) {
            console.log(`${answer.name} has been added to departments.`);
            console.table(results);
          
          });
        });
        break;

      case 'Add a role':
        // Prompt the user for the role information and add it to the database
        inquirer.prompt(addRoleQuestions)
        .then((answer) => {
          // Code to add a role
          db.query(`INSERT INTO role(title, salary, department_id) 
          SELECT ?, ?, id 
          FROM department 
          WHERE department.department_name = ?`, [answer.title, answer.salary, answer.department], function (err, results) {
  if (err) throw err;
  console.log(`${answer.title} has been added to roles.`);
  console.table(results);
});

});
        break;

        case 'Add an employee':
  // Prompt the user for the employee information and add it to the database
  inquirer.prompt(addEmployeeQuestions)
    .then((answer) => {
      // Query the database to get the id of the manager
      db.query(`SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, answer.manager_name, function(err, managerResult) {
        if (err) throw err;

        const managerId = managerResult[0].id;
        
        // Code to add an employee
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) 
          SELECT?,?,?,?`, [answer.first_name, answer.last_name, answer.role_id, managerId], function (err, results) {
          if (err) throw err;
          console.log(`${answer.first_name} ${answer.last_name} has been added to employees.`);
          console.table(results);
        });
      });
    });
  break;
        

      case 'Update an employee role':
        // Prompt the user for the employee information and add it to the database
        inquirer.prompt(updateEmployeeRoleQuestions)
        .then((answer) => {
          // Code to update an employee role
          db.query(
            `UPDATE employee SET employee.role_id = (SELECT id FROM role WHERE role.title =?) WHERE CONCAT(first_name,'', last_name) =?`,
            [answer.new_role_id, answer.employee_id],
            function (err, results) {
              if (err) throw err;
              console.log(`${answer.employee_id}'s role has been updated.`);
              console.table(results);
            }
          );
        });
        break;

      default:
        console.log('Invalid option selected');
        break;
    }
  });
