export default class Task {
    constructor(title, description, dueDate, priority, originProjectName) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.originProjectName = originProjectName;
        this.isDone = false;
        this.id = Date.now();
    }

    toggleIsDone() {
        this.isDone = !this.isDone;
    }
}