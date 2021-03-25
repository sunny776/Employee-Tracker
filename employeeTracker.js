const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",

  database: "employeeDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);

  setTimeout(start, 1000);
});

const start = () => {
  inquirer
    .prompt({
      name: "userAnswer",
      type: "list",
      message: "What would you like to do ?",
      choices: [
        "View All Employee.",
        "View All Employee By Role.",
        "View All Employee By Departments.",
        "Update Employee.",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Exit",
      ],
    })
    .then((answer) => {
      // based on their answer, either call the bid or the post functions
      if (answer.userAnswer === "View All Employee.") {
        ViewEmployee();
      } else if (answer.userAnswer === "View All Employee By Role.") {
        ViewEmployeeByRole();
      } else if (answer.userAnswer === "View All Employee By Departments.") {
        ViewEmployeeByDepartments();
      } else if (answer.userAnswer === "Update Employee.") {
        UpdateEmployee();
      } else if (answer.userAnswer === "Add Employee") {
        AddEmployee();
      } else if (answer.userAnswer === "Add Role") {
        AddRole();
      } else if (answer.userAnswer === "Add Department") {
        AddDepartment();
      } else answer.exit === "Exit";
      // connection.end();
    });
};
//function to handle viewing employee
const ViewEmployee = () => {
  connection.query(
    "SELECT employee.first_name, employee.last_name, title, salary, name_dep as Department, concat(emp.first_name,' ',emp.last_name) as Manager from employee join roles on employee.role_id = roles.id join department on roles.department_id = department.id left join employee as emp  on employee.manager_id = emp.id ",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
};

const ViewEmployeeByRole = () => {
  connection.query(
    "select employee.first_name, employee.last_name, title from employee join roles on employee.role_id = roles.id ",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
};

const ViewEmployeeByDepartments = () => {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.name_dep AS Department FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employee.id",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
};

const AddEmployee = () => {
  
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter employee first name ?",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter employee last name?",
      },
      {
        name: "employeeRole",
        type: "list",
        message: "Select employee role?",
        choices: [
          "Stylist",
          "Assistant Store Manager",
          "Store Manager",
          "Brand Manager",
          "Business Partner",
          "HR Director",
          "System Adminstrator",
          "IT Coordinator",
          "IT Manager",
        ],
      },
    ])
    .then((answer) => {
      

      connection.query(
        "INSERT INTO employee SET ?",
       
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
        },
        (err) => {
          if (err) throw err;
          console.log("you employee has been added");
          start();
        }
      );
    });
};
