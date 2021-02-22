const {Menuopt, pause, ReadInput,DeleteMenu,confirm, CompletePendingTasks} = require('./Controllers/messages');
const { saveDB,readDB } = require('./Controllers/savefile');
const Tasks = require('./Models/tasks');


const main = async() =>
{
    let opt = '';
    const tasks = new Tasks();
    const taskdb = readDB();

    /*
        /////////////////////////////////////////////////////////////
            A switch Case With The Diferent Menu Options
        ////////////////////////////////////////////////////////////
    */


    if (taskdb){tasks.loadTaskFromData(taskdb);}
    do {
        opt = await Menuopt();
        
        switch (opt) {
            case '1':
                const desc = await ReadInput('Description: '); 
                tasks.NewTask(desc);
            break;
            case '2':
                tasks.TaskList();
            break;
            case '3':
                tasks.CompleteAndPendingTask(true);
            break;
            case '4':
                tasks.CompleteAndPendingTask(false);
            break;
            case '5':
                const ids = await CompletePendingTasks(tasks.ListArray);
                tasks.togglePendingTask(ids);
            break;
            case '6':
               const id = await DeleteMenu(tasks.ListArray);
                if(id !== '0'){
                    const ok = await confirm(`Are you sure?`);
                    if(ok){
                        tasks.deleteTask(id);
                        console.log("Task has been deleted");
                    }
                }
            break;
            case '0':
                
            break;
            default:
                break;
        }
       
        saveDB(tasks.ListArray);
        await pause();
        console.clear;
    } while (opt !== '0');
}

main();