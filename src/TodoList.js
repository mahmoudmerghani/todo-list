import Storage from "./Storage";

export default class TodoList {
    static allTasksProjectID = 0; // special ID for the default project

    constructor() {
        this.projects = [];
    }

    addProject(projectObj) {
        const projectExists = this.projects.some((project) => project.name === projectObj.name);
        
        if (projectExists) {
            return false;
        }
    
        this.projects.push(projectObj);
        Storage.saveTodoList(this);
        return true;
    }
    
    getProject(id) {
        return this.projects.find((project) => project.id === id) || null;
    }

    deleteProject(id) {
        this.projects = this.projects.filter((project) => project.id !== id);
        Storage.saveTodoList(this);
    }

    addTask(taskObj, projectID) {
        if (this.getProject(projectID).addTask(taskObj)) {
            Storage.saveTodoList(this);
            return true;
        }
        return false;
    }

    getTask(taskID) {
        for (const project of this.projects) {
            const task = project.getTask(taskID);
            if (task) {
                return task;
            }
        }
        return null;
    }

    deleteTask(taskID) {
        for (const project of this.projects) {
            const task = project.getTask(taskID);
            if (task) {
                project.deleteTask(taskID);
                Storage.saveTodoList(this);
            }
        }
    }

    toggleIsTaskDone(taskID) {
        for (const project of this.projects) {
            const task = project.getTask(taskID);
            if (task) {
                task.toggleIsTaskDone();
                Storage.saveTodoList(this);
            }
        }
    }
}