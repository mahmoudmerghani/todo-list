export default class TodoList {
    constructor() {
        this.projects = [];
    }

    addProject(projectObj) {
        const projectExists = this.projects.some((project) => project.name === projectObj.name);
        
        if (projectExists) {
            return false;
        }
    
        this.projects.push(projectObj);
        return true;
    }
    
    getProject(id) {
        return this.projects.find((project) => project.id === id) || null;
    }

    deleteTask(id) {
        this.projects.forEach((project) => {
            project.deleteTask(id);
        });
    }
}