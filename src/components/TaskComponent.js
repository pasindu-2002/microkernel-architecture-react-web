class TaskComponent{

    constructor(kernel){
        this.kernel = kernel;
        this.tasks = [];
    }

    init(){
        console.log("TaskComponent initialized");
        this.kernel.subscribe("addTask", this.addTask.bind(this));
    }

    destroy(){
        console.log("TaskComponent destroyed");
    }

    addTask(task){
        this.tasks.push(task);
        console.log("Task added: ", task);
    }
} 

 export default TaskComponent;