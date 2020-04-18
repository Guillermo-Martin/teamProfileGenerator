const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// INQUIRER:  BASIC QUESTIONS
const basicQuestions = [
    {
        type: "input",
        name: "name",
        message:  "What is your name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?"
    },
    {
        type: "list",
        name: "role",
        message: "What is your role?",
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
        message: "What is your office number?"
    }
];

// INQUIRER: ENGINEER QUESTION (ASK IF THEY PICK ENGINEER)
const engineerQuestion = {
    type: "input",
    name: "githubUserName",
    message: "What is your Github username?"
}

// INQUIRER: INTERN QUESTION (ASK IF THEY PICK INTERN)
const internQuestion = {
    type: "input",
    name: "schoolName",
    message: "Where do you currently go to school?"
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
            console.log(response);
            return decision = response.makeAnother;
        });

        // if decision above is "yes" run the async function again
        if(decision === "Yes"){
            await userData();
        } else {
            return;
        }

        // check employeearray
        console.log(employeeArray);

    } catch (err){
        console.log(err);
    }
}



// call the userData() function
userData();





// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// X HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// X HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```





// ================= NOTES =======================


// // INQUIRER: ASK BASIC QUESTIONS
// inquirer.prompt(basicQuestions).then(function(response){
//     console.log(response);
// });

// // INQUIRER: IF MANAGER, ASK THIS QUESTION
// inquirer.prompt(managerQuestion).then(function(response){
//     console.log(response);
// });

// // // INQUIRER: IF ENGINEER, ASK THIS QUESTION
// inquirer.prompt(engineerQuestion).then(function(response){
//     console.log(response);
// });

// // // INQUIRER: IF INTERN, ASK THIS QUESTION
// inquirer.prompt(internQuestion).then(function(response){
//     console.log(response);
// });

// INQUIRER:  ROLE QUESTION
// const roleQuestion = [
//     {
//     type: "list",
//     name: "role",
//     message: "What is your role?",
//     choices: [
//         "Manager",
//         "Engineer",
//         "Intern"
//     ]}
// ]


// WORKING ASYNC FUNCTION
// async function userData(){
//     try{
//         // ask basic questions first
//         await inquirer.prompt(basicQuestions).then(function(response){
//             return basicUser = response;
//         });

//         // ask role question next
//         await inquirer.prompt(roleQuestion).then(function(response){
//             return employeeRole = response.role;
//         });

//             // use role response from above to filter the questions
            // switch(employeeRole){
            //     case "Manager":
            //         inquirer.prompt(managerQuestion).then(function(response){
            //             basicUser.officeNumber = response.officeNumber;
            //             dataArray.push(basicUser);
            //             console.log(dataArray);
            //         });

            //         break;

            //     case "Engineer":
            //         inquirer.prompt(engineerQuestion).then(function(response){
            //             basicUser.githubUsername = response.githubUserName;
            //             dataArray.push(basicUser);
            //             console.log(dataArray);
            //         });                
                    
            //         break;

            //     case "Intern":
            //         inquirer.prompt(internQuestion).then(function(response){
            //             basicUser.schoolName = response.schoolName;
            //             dataArray.push(basicUser);
            //             console.log(dataArray);
            //         });

            //         break;

            //     default:

            //         break;
            // };


//     } catch (err){
//         console.log(err);
//     }
// }