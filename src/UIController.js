import UI from "./UI";
import Task from "./Task";
import Project from "./Project";
import TodoList from "./TodoList";

export default class UIController {
    constructor() {
        this.todoList = new TodoList();
        this.allTasksProject = new Project("All Tasks");
        this.currentProject = this.allTasksProject;
        this.todoList.projects.push(this.allTasksProject);
        this.renderAllTasksProject();
        this.renderAllTasks();
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
            if (project === this.allTasksProject) {
                projectContainer.appendChild(UI.createAllProject(project));
            }
            else {
                projectContainer.appendChild(UI.createProject(project));
            }
        });
    }

    renderCurrentProjectTasks() {
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
                taskContainer.appendChild(UI.createAllTasks(task));
            });
        });
    }

    renderAllTasksProject() {
        const projectContainer = document.querySelector(".project-container");
        projectContainer.innerHTML = "";
        projectContainer.appendChild(UI.createAllProject(this.allTasksProject));
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
            if (this.todoList.addProject(projectObj)) {
                this.currentProject = projectObj;
                this.renderProjects();
                this.renderCurrentProjectTasks();
    
                projectForm.reset();
                this.switchFormVisibility(projectForm);
            }
            else {
                alert("Duplicate project name\nTry different name");
            }
        });
        
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = this.getTaskFormData(taskForm);
            const taskObj = new Task(
                formData.get("title"),
                formData.get("description"),
                formData.get("dueDate"),
                formData.get("priority"),
                this.currentProject.name,
            );
            if (this.currentProject.addTask(taskObj)) {
                if (this.currentProject === this.allTasksProject) {
                    this.renderAllTasks();
                }
                else {
                    this.renderCurrentProjectTasks();
                }

                taskForm.reset();
                this.switchFormVisibility(taskForm);
            }
            else {
                alert("Duplicate task name in the same project.\nTry different name");
            }
        });

        projectContainer.addEventListener("click", (e) => {
            if (
                e.target.classList.contains("all-project") &&
                !e.target.classList.contains("selected")
            ) {
                this.currentProject = this.allTasksProject;
                this.renderAllTasks();
                UI.applySelectedStyle(e.target);
            }
            else if (
                e.target.classList.contains("project") &&
                !e.target.classList.contains("selected")
            ) {
                const projectID = e.target.dataset.id;
                this.currentProject = this.todoList.getProject(Number(projectID));
                this.renderCurrentProjectTasks();
                UI.applySelectedStyle(e.target);
            }
        });

        taskContainer.addEventListener("click", (e) => {
            if (e.target.className === "toggle") {
                const taskID = e.target.parentElement.parentElement.dataset.id;
                /* 
                 * if "All Tasks" project is the current selected project
                 * search this task in all projects in the list
                 * because "All Tasks" project shows tasks that 
                 * may be stored in another project object 
                 */
                if (this.currentProject === this.allTasksProject) {
                    const task = this.todoList.getTask(Number(taskID));
                    task.toggleIsDone();
                    this.renderAllTasks();
                }
                else {
                    const task = this.currentProject.getTask(Number(taskID));
                    task.toggleIsDone();
                    this.renderCurrentProjectTasks();
                }
            }
            else if (e.target.className === "delete") {
                const taskID = e.target.parentElement.parentElement.dataset.id;
                if (this.currentProject === this.allTasksProject) {
                    this.todoList.deleteTask(Number(taskID));
                    this.renderAllTasks();
                }
                else {
                    this.currentProject.deleteTask(Number(taskID));
                    this.renderCurrentProjectTasks();
                }
            }
        });
    }
}