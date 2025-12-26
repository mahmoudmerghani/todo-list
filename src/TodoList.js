let todoList = localStorage.getItem("todoList");

const DEFAULT_PROJECT_ID = 0;

if (!todoList) {
    todoList = {
        tasks: [],
        projects: [{ name: "All Tasks", id: DEFAULT_PROJECT_ID }],
    };
} else {
    todoList = JSON.parse(todoList);
}

function addTask({
    title,
    description = "",
    dueDate = null,
    priority = "medium",
    isDone = false,
    projectId,
}) {
    const task = {
        id: Date.now(),
        title,
        description,
        isDone,
        dueDate,
        priority,
        projectId,
    };

    todoList.tasks.push(task);

    save();

    return task;
}

function addProject(name) {
    const project = { name, id: Date.now() };
    todoList.projects.push(project);

    save();

    return project;
}

function getTasksInProject(projectId) {
    return todoList.tasks.filter((task) => task.projectId === projectId);
}

function getProjectById(projectId) {
    const project = todoList.projects.find(
        (project) => project.id === projectId,
    );
    return project || null;
}

function getProjectByName(projectName) {
    const project = todoList.projects.find(
        (project) => project.name === projectName,
    );
    return project || null;
}

function getTaskByTitle(taskTitle) {
    const task = todoList.tasks.find((task) => task.title === taskTitle);
    return task || null;
}

function getAllProjects() {
    return todoList.projects;
}

function getAllTasks() {
    return todoList.tasks;
}

function deleteProject(projectId) {
    todoList.projects = todoList.projects.filter(
        (project) => project.id !== projectId,
    );

    todoList.tasks = todoList.tasks.filter(
        (task) => task.projectId !== projectId,
    );

    save();
}

function toggleIsTaskDone(taskId) {
    todoList.tasks = todoList.tasks.map((task) => {
        if (taskId === task.id) {
            return { ...task, isDone: !task.isDone };
        } else {
            return task;
        }
    });

    save();
}

function deleteTask(taskId) {
    todoList.tasks = todoList.tasks.filter((task) => task.id !== taskId);

    save();
}

function save() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

export default {
    addProject,
    addTask,
    getTasksInProject,
    getProjectById,
    getProjectByName,
    getTaskByTitle,
    getAllProjects,
    deleteProject,
    getAllTasks,
    toggleIsTaskDone,
    deleteTask,
    DEFAULT_PROJECT_ID,
};
