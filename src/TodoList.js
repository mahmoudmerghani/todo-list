export default class TodoList {
    constructor() {
        this.projects = [];
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