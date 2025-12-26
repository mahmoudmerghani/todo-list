import "./style.css";
import UI from "./UI";
import todoList from "./todoList";

let currentProjectId = todoList.DEFAULT_PROJECT_ID;

const addProjectBtn = document.getElementById("addProject");
const addTaskBtn = document.getElementById("addTask");
const cancelProjectBtn = document.getElementById("cancelProject");
const cancelTaskBtn = document.getElementById("cancelTask");
const projectForm = document.querySelector(".project-form");
const taskForm = document.querySelector(".task-form");
const projectContainer = document.querySelector(".project-container");
const taskContainer = document.querySelector(".task-container");

function render() {
    UI.renderProjects(todoList.getAllProjects(), projectContainer);

    if (currentProjectId === todoList.DEFAULT_PROJECT_ID) {
        const allTasks = todoList.getAllTasks();
        const tasksWithProjectNames = allTasks.map((task) => {
            const projectName = todoList.getProjectById(task.projectId).name;
            return { ...task, projectName };
        });

        UI.renderTasks(tasksWithProjectNames, taskContainer);
    } else {
        const tasksInProject = todoList.getTasksInProject(currentProjectId);
        UI.renderTasks(tasksInProject, taskContainer);
    }

    UI.applySelectedStyle(currentProjectId);
}

function addProject(e) {
    e.preventDefault();

    const projectName = projectForm.name.value;
    const existingProject = todoList.getProjectByName(projectName);

    if (existingProject) {
        alert("Duplicate project name\nTry different name");
        return;
    }

    const project = todoList.addProject(projectName);
    currentProjectId = project.id;

    projectForm.reset();

    UI.switchVisibility(projectForm);
    UI.switchVisibility(addProjectBtn);
    render();
}

function addTask(e) {
    e.preventDefault();
    const title = taskForm.title.value;
    const description = taskForm.description.value;
    const dueDate = taskForm.dueDate.value;
    const priority = taskForm.priority.value;

    const existingTask = todoList.getTaskByTitle(title);

    if (existingTask && existingTask.projectId === currentProjectId) {
        alert("Duplicate task title in the same project\nTry different title");
        return;
    }

    todoList.addTask({
        title,
        description,
        dueDate,
        priority,
        projectId: currentProjectId,
    });

    taskForm.reset();

    UI.switchVisibility(taskForm);
    UI.switchVisibility(addTaskBtn);
    render();
}

function selectProject(e) {
    if (
        !e.target.classList.contains("project") ||
        e.target.classList.contains("selected")
    ) {
        return;
    }

    currentProjectId = Number(e.target.dataset.id);
    render();
}

function deleteProject(e) {
    if (!e.target.classList.contains("delete-project")) return;

    const projectId = Number(e.target.closest(".project").dataset.id);
    todoList.deleteProject(projectId);

    if (currentProjectId === projectId) {
        currentProjectId = todoList.DEFAULT_PROJECT_ID;
    }

    render();
}

function toggleIsTaskDone(e) {
    if (!e.target.classList.contains("toggle")) return;

    const taskId = Number(e.target.closest(".task").dataset.id);
    todoList.toggleIsTaskDone(taskId);

    render();
}

function deleteTask(e) {
    if (!e.target.classList.contains("delete")) return;

    const taskId = Number(e.target.closest(".task").dataset.id);
    todoList.deleteTask(taskId);

    render();
}


render();

addProjectBtn.addEventListener("click", () => {
    UI.switchVisibility(projectForm);
    UI.switchVisibility(addProjectBtn);
});
cancelProjectBtn.addEventListener("click", () => {
    projectForm.reset();
    UI.switchVisibility(projectForm);
    UI.switchVisibility(addProjectBtn);
});

addTaskBtn.addEventListener("click", () => {
    UI.switchVisibility(taskForm);
    UI.switchVisibility(addTaskBtn);
});
cancelTaskBtn.addEventListener("click", () => {
    taskForm.reset();
    UI.switchVisibility(taskForm);
    UI.switchVisibility(addTaskBtn);
});

projectForm.addEventListener("submit", addProject);

taskForm.addEventListener("submit", addTask);

projectContainer.addEventListener("click", selectProject);
projectContainer.addEventListener("click", deleteProject);

taskContainer.addEventListener("click", toggleIsTaskDone);
taskContainer.addEventListener("click", deleteTask);
