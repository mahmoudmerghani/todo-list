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

    deleteProject(id) {
        this.projects = this.projects.filter((project) => project.id !== id);
    }

    getTask(id) {
        for (const project of this.projects) {
            const task = project.getTask(id); 
            if (task) {
                return task;
            }
        }
        return null;
    }

    deleteTask(id) {
        this.projects.forEach((project) => {
            project.deleteTask(id);
        });
    }
}