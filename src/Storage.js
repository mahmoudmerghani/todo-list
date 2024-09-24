import TodoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";

export default class Storage {
    static saveTodoList(TodoListObj) {
        localStorage.setItem("todoList", JSON.stringify(TodoListObj));
    }

    static getTodoList() {
        const todoListItem = localStorage.getItem("todoList");
        if (!todoListItem) {
            return null;
        }
        const todoList = Object.assign(new TodoList(), JSON.parse(todoListItem));

        todoList.projects = todoList.projects.map((project) => {
            return Object.assign(new Project(), project);
        });

        todoList.projects.forEach((project) => {
            project.tasks = project.tasks.map((task) => {
                return Object.assign(new Task(), task);
            });
        });

        return todoList;
    }
}