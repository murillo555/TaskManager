const TaskObj= require('./task');

    /*
        /////////////////////////////////////////////////////////////
           Object that stores the created tasks 
        ////////////////////////////////////////////////////////////
    */
class Tasks
{
    _List = {};
    constructor()
    {
        this._List = {};
    }
    
    /*
        /////////////////////////////////////////////////////////////
        Delete a task from the object _list with the Task id
        ////////////////////////////////////////////////////////////
    */

    deleteTask(id='')
    {
        if(this._List[id])
        {
            delete this._List[id];
        }
    }

    /*
        /////////////////////////////////////////////////////////////
        Get each stored task
        ////////////////////////////////////////////////////////////
    */

    get ListArray()
    {
     
        const listado = [];
            Object.keys(this._List).forEach( key => 
                {
                    const Task = this._List[key]; 
                    listado.push(Task);
                }); 
        return listado;
    } 

    /*
        /////////////////////////////////////////////////////////////
        ///// Load _list with the data stored in the Data Base /////
        ////////////////////////////////////////////////////////////
    */


    loadTaskFromData(tasks = [])
    {    
        tasks.forEach(task=>{this._List[task.id] = task;})
    } 

    /*
        /////////////////////////////////////////////////////////////
        /////                Create New Task                    /////
        ////////////////////////////////////////////////////////////
    */

    NewTask(desc = '')
    {
        
        const Task = new TaskObj(desc);
        this._List[Task.id]= Task;
    }

    /*
        /////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////    
        ////////////////////////////////////////////////////////////
    */


    TaskList()
    {

        let complete;
        let number;
        let i = 1;
        console.log();
       this.ListArray.forEach(task=>{
            number =`${i}.`.green;
           (task.CompleteDate)
            ?complete ='Complete'.green
            :complete = 'Pending'.red;
        
            console.log(`${number} ${task.description} :: ${complete}`)

            i+=1;
        })
        console.log();
    }

    /*
        /////////////////////////////////////////////////////////////
            Lista Complete or Pending Task
        ////////////////////////////////////////////////////////////
    */


    CompleteAndPendingTask(complete = true)
    {
        let number;
        let i = 1;
        console.log();
        this.ListArray.forEach(task =>
            {
                number =`${i}.`.green;
               if (complete)

               {if(task.CompleteDate){console.log(`${number} ${task.description} :: ${task.CompleteDate.green}`);i+=1;};}

               else{if(!task.CompleteDate){console.log(`${number} ${task.description} :: ${'Pending'.red}`);i+=1;}}

            })
            console.log();
    }

    /*
        /////////////////////////////////////////////////////////////
            Toggle Between complete and Pending Task
        ////////////////////////////////////////////////////////////
    */

    togglePendingTask(ids = [])
    {
            ids.forEach(id=>
                {
                    const task = this._List[id];
                    if (!task.CompleteDate)
                    {
                        task.CompleteDate = new Date().toDateString();
                    }
                })
            this.ListArray.forEach(task =>
                {
                    if(!ids.includes(task.id)) 
                    {
                        this._List[task.id].CompleteDate = null;
                    }
                })
    }
}
module.exports = Tasks;