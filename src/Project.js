export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.id = Date.now();
    }

    getTask(id) {
        return this.tasks.find((task) => task.id === id) || null;
    }    

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
}