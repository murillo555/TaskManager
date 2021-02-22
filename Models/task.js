const {v4} = require('uuid'); 

class TaskObj {
    id = '';
    description ='';
    CompleteDate = null; 
    
    constructor(desc)
    {
        this.id = v4();
        this.description = desc;
        this.CompleteDate = null;
    }
}




module.exports = TaskObj;