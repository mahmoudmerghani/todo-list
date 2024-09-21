import Task from "./Task";
import Project from "./Project";

class TodoList {
    constructor() {
        this.projects = [];
    }

    getProject(id) {
        return this.projects.find((project) => project.id === id) || null;
    }
}

export {Task, Project, TodoList};