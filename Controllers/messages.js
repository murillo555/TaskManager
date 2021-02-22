const inquirer = require('inquirer');
require('colors');

    /*
        /////////////////////////////////////////////////////////////
            Create the necessary options by the "inquirer" Menu
        ////////////////////////////////////////////////////////////
    */
const MenuQuestions = 
[
    {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
        {value:'1', name:`${'1.'.green} New Task`},
        {value:'2', name:`${'2.'.green} List Tasks`},
        {value:'3', name:`${'3.'.green} List Complete Tasks`},
        {value:'4', name:`${'4.'.green} List Pending Tasks`},
        {value:'5', name:`${'5.'.green} Complete Tasks`},
        {value:'6', name:`${'6.'.red} Delete Task`},
        {value:'0', name:`${'0.'.green} Finish`},
    ]

    }];

    /*
        /////////////////////////////////////////////////////////////
            Display the MenuOptions
        ////////////////////////////////////////////////////////////
    */
const Menuopt = async() =>
{ 
    console.clear
    console.log('========================'.green);
    console.log('select an Option'.white);
    console.log('========================\n'.green);
    
    const {option} = await inquirer.prompt(MenuQuestions); 
    return option;
};
    /*
        /////////////////////////////////////////////////////////////
            Get the Task Description
        ////////////////////////////////////////////////////////////
    */

const ReadInput = async (message) =>
{
    const question = 
    [{
            type: 'input', 
            name: 'desc',
            message,
            validate(value)
            {
                if(value.length == 0) return 'Please type some value'; 
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc; 

};
    /*
        /////////////////////////////////////////////////////////////
            Pause Function
        ////////////////////////////////////////////////////////////
    */

const pause = async() => inquirer.prompt([{type:'input', name:"Pause", message:`Press ${'Enter'.green} to continue: `}]); 

    /*
        /////////////////////////////////////////////////////////////
            Delete Tasks
        ////////////////////////////////////////////////////////////
    */

const DeleteMenu = async (task) =>
{
    let number,i=1;
    const choices = task.map((task,i) =>  
        {
        number =`${i+1}.`.green;
        return {value:task.id, name:`${number} ${task.description}`};
        });
        choices.unshift({
            value:'0',
            name:'0.'.green +'Cancel'
        }) 
    const questionDelete = 
    [
        {
        type: 'list',
        name: 'id',
        message: 'Delete Task: ',
        choices
        }
    ];

        const {id} = await inquirer.prompt(questionDelete);
        return id;  
};

    /*
        /////////////////////////////////////////////////////////////
            Confirm option when you try to delete a Task
        ////////////////////////////////////////////////////////////
    */

const confirm = async message=>
{
    const question=
    {
        type: 'confirm',
        name: 'ok',
        message
    }

    const {ok} = await inquirer.prompt(question); 
    return ok;

};

    /*
        /////////////////////////////////////////////////////////////
        Toggle Menu Between complete and pending Task with checkbox
        ////////////////////////////////////////////////////////////
    */

const CompletePendingTasks = async task =>
{
    const choices = task.map((task,i) =>  
    {
    number =`${i+1}.`.green;
    return {value:task.id, name:`${number} ${task.description}`,checked:(task.CompleteDate)?true:false};
    });
    const questionComplete = 
    [
        {
        type: 'checkbox',
        name: 'ids',
        message: 'Complete Tasks',
        choices
        }
    ];
    
    const {ids} = await inquirer.prompt(questionComplete);
    return ids;



}

    /*
        /////////////////////////////////////////////////////////////
                Function Exports
        ////////////////////////////////////////////////////////////
    */

module.exports ={Menuopt,pause,ReadInput,DeleteMenu,confirm,CompletePendingTasks}