import inquirer from 'inquirer'
import fs from 'fs'
import Engineer from './lib/Engineer';
import Intern from './lib/Intern';
import Manager from './lib/Manager';
import generateHTML from './generateHTML';
teammember =[];

function createManager() {
    inquirer
        .prompt([
        {
            type:'input',
            message: 'what is the team managers name?',
            name: 'username',
        },
        {
            type: 'number',
            message: 'what is the team managrs id?',
            name: 'idnumber',
        },
        {
            type: 'input',
            message: 'what is the team managers email?',
            name: 'email',
        },
        {
            type:'number',
            message:'what is the team managers office number?',
            name:'officenumber',
        }
    ]).then(response => {
        const {username,idnumber,email,officenumber}= response;
        console.log( response);
        
        const manager = new Manager(username,idnumber,email,officenumber);
        teammember.push(manager);
        createTeamMember()
    })
}
function createTeamMember() {

    inquirer.prompt([
        { 
            type:'checkbox',
            message:'which type of team member would you like to add?',
            name:'teammember',
            choices: ['Engineer','Intern', 'None'],
        }
    ]).then(response => {
        if (response.teammember === 'Engineer') {
            createEngineer()
        }
        if (response.teammember === 'Intern') {
            createIntern()
        }
        if (response.teammember === 'None') {
            writeToFile()
        }
    })
}

function createEngineer() {
    inquirer.prompt([
        {
            type:'input',
            message:'what is your engineers name?',
            name:'username',
            
        },
        {
            type:'number',
            message:'what is the team engineers id?',
            name:'idnumber'
        },
        {
            type:'input',
            message:'what is the team engineers email?',
            name:'email',
        },
        {
            type:'input',
            message:'what is your engineers Github username?',
            name:'GithubUsername',
        },
    ]).then(response => {
        const {username,idnumber,email,GithubUser}= response;
        console.log( response);
        const engineer = new Engineer(username,idnumber,email,GithubUser);
       
        teammember.push(engineer);
        createTeamMember();
    })
}

function createIntern() {
    inquirer.prompt([
        {
            type:'input',
            message:'what is your intern name?',
            name:'username',
            
        },
        {
            type:'number',
            message:'what is the team intern id?',
            name:'idnumber'
        },
        {
            type:'input',
            message:'what is the team intern email?',
            name:'email',
        },
        {
            type:'input',
            message:'what is your intern school?',
            name:'school',
        },
    ]).then(response => {
        const {username,idnumber,email,school}= response;
        console.log( response);
        const intern = new Intern(username,idnumber,email,school);
        
        teammember.push(intern);
        createTeamMember()
    })
}

function writeToFile() { 
    var data = generateHTML(teammember);
    fs.writeFile('index.html', data);
}

createManager();