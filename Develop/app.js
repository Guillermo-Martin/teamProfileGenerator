// Require dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// INQUIRER:  BASIC QUESTIONS
const basicQuestions = [
    {
        type: "input",
        name: "name",
        message:  "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]}
];


// INQUIRER: MANAGER QUESTION (ASK IF THEY PICK MANAGER)
const managerQuestion = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is the Manager's office number?"
    }
];

// INQUIRER: ENGINEER QUESTION (ASK IF THEY PICK ENGINEER)
const engineerQuestion = {
    type: "input",
    name: "githubUserName",
    message: "What is the Engineer's Github username?"
}

// INQUIRER: INTERN QUESTION (ASK IF THEY PICK INTERN)
const internQuestion = {
    type: "input",
    name: "schoolName",
    message: "Where does the intern currently go to school?"
}

// INQUIRER: MAKE ANOTHER EMPLOYEE?
const makeAnother = {
    type: "list",
    name: "makeAnother",
    message: "Would you like to add another employee?",
    choices: [
        "Yes",
        "No"
    ]
}

// Array to store all users
const employeeArray = []
let employee = "";

// CREATING THE FUNCTION TO COMBINE DATA
async function userData(){
    try{
        // ask basic questions first
        await inquirer.prompt(basicQuestions).then(function(response){
            return employeeData = response;
        });

        // filter out the role response here
        switch(employeeData.role){
            case "Manager":
                await inquirer.prompt(managerQuestion).then(function(response){
                    employeeData.officeNumber = response.officeNumber;
                });

                employee = new Manager(employeeData.name, employeeData.id, employeeData.email, employeeData.officeNumber);
                
                break;

            case "Engineer":
                await inquirer.prompt(engineerQuestion).then(function(response){
                    employeeData.github = response.githubUserName;
                });                

                employee = new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github);

                break;

            case "Intern":
                await inquirer.prompt(internQuestion).then(function(response){
                    employeeData.school = response.schoolName;
                });

                employee = new Intern(employeeData.name, employeeData.id, employeeData.email, employeeData.school);
                
                break;

            default:

                break;
        };

        // push employee to employee array
        employeeArray.push(employee);
        console.log("Employee added!");

        // ask if the user wants to make another employee
        await inquirer.prompt(makeAnother).then(function(response){
            return decision = response.makeAnother;
        });

        // if decision above is "yes" run the async function again
        if(decision === "Yes"){
            await userData();
        } else {
            console.log(employeeArray);
            
            // call the render() function
            let allEmployees = render(employeeArray);

            // create the html file
            fs.writeFile(outputPath, allEmployees, function(err){
                if(err){
                    console.log(err);
                }
                    console.log("Data entered!");
            })   
        }

    } catch (err){
        console.log(err);
    }
}

// call the userData() function
userData();
