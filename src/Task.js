export default class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = false;
        this.id = Date.now();
    }

    toggleIsDone() {
        this.isDone = !this.isDone;
    }
}