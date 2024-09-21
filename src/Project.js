export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.id = Date.now();
    }

    addTask(taskObj) {
        const taskExists = this.tasks.some((task) => task.title === taskObj.title);
        
        if (taskExists) {
            return false;
        }
    
        this.tasks.push(taskObj);
        return true;
    }

    getTask(id) {
        return this.tasks.find((task) => task.id === id) || null;
    }    

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
}