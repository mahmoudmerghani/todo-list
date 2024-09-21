import UI from "./UI";
import Task from "./Task";
import Project from "./Project";
import TodoList from "./TodoList";

export default class UIController {
    constructor() {
        this.todoList = new TodoList();
        this.defaultProject = new Project("All Tasks");
        this.currentProject = this.defaultProject;
        this.todoList.projects.push(this.defaultProject);
        this.renderProjects();
        this.bindEventListeners();
    }

    getTaskFormData(form) {
        const formObj = new FormData(form);
        return formObj;
    }

    switchFormVisibility(form) {
        const addTaskBtn = document.getElementById("addTask");
        const addProjectBtn = document.getElementById("addProject");

        if (getComputedStyle(form).display === "block") {
            form.style.display = "none";
            addTaskBtn.style.display = "block";
            addProjectBtn.style.display = "block";
        }
        else {
            form.style.display = "block";
            addTaskBtn.style.display = "none";
            addProjectBtn.style.display = "none";
        }    
    }

    renderProjects() {
        const projectContainer = document.querySelector(".project-container");
        projectContainer.innerHTML = "";
        this.todoList.projects.forEach((project) => {
            projectContainer.appendChild(UI.createProject(project));
        });
    }

    renderTasks() {
        const taskContainer = document.querySelector(".task-container");
        taskContainer.innerHTML = "";
        this.currentProject.tasks.forEach((task) => {
            taskContainer.appendChild(UI.createTask(task));
        });
    }
    
    renderAllTasks() {
        const taskContainer = document.querySelector(".task-container");
        taskContainer.innerHTML = "";
        this.todoList.projects.forEach((project) => {
            project.tasks.forEach((task) => {
                taskContainer.appendChild(UI.createTask(task));
            });
        });

    }

    bindEventListeners() {
        const addProjectBtn = document.getElementById("addProject");
        const addTaskBtn = document.getElementById("addTask");
        const cancelProjectBtn = document.getElementById("cancelProject");
        const cancelTaskBtn = document.getElementById("cancelTask");
        const projectForm = document.querySelector(".project-form");
        const taskForm = document.querySelector(".task-form");
        const projectContainer = document.querySelector(".project-container");
        const taskContainer = document.querySelector(".task-container");

        addProjectBtn.addEventListener("click", () => this.switchFormVisibility(projectForm));
        cancelProjectBtn.addEventListener("click", () => this.switchFormVisibility(projectForm));
        
        addTaskBtn.addEventListener("click", () => this.switchFormVisibility(taskForm));
        cancelTaskBtn.addEventListener("click", () => this.switchFormVisibility(taskForm));
        
        projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = this.getTaskFormData(projectForm);
            const projectObj = new Project(formData.get("name"));
            this.todoList.projects.push(projectObj);
            this.currentProject = projectObj;
            this.renderProjects();
            this.renderTasks();

            projectForm.reset();
            this.switchFormVisibility(projectForm);
        });
        
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = this.getTaskFormData(taskForm);
            const taskObj = new Task(
                formData.get("title"),
                formData.get("description"),
                formData.get("dueDate"),
                formData.get("priority"),
            );
            this.currentProject.tasks.push(taskObj);
            if (this.currentProject !== this.defaultProject) {
                this.defaultProject.tasks.push(taskObj);
            }
            this.renderTasks();

            taskForm.reset();
            this.switchFormVisibility(taskForm);
        });

        projectContainer.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("project") &&
                !e.target.classList.contains("selected")
            ) {
                const projectID = e.target.dataset.id;
                this.currentProject = this.todoList.getProject(Number(projectID));
                this.renderTasks();
                UI.applySelectedStyle(e.target);
            }
        });

        taskContainer.addEventListener("click", (e) => {
            if (e.target.className === "toggle") {
                const taskID = e.target.parentElement.parentElement.dataset.id;
                const task = this.currentProject.getTask(Number(taskID));
                task.toggleIsDone();
                this.renderTasks();
            }
            else if (e.target.className === "delete") {
                const taskID = e.target.parentElement.parentElement.dataset.id;
                this.todoList.deleteTask(Number(taskID));
                this.renderTasks();
            }
        });
    }
}