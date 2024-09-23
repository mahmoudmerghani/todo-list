export default class UI {
    static createProject(projectObj) {
        const project = document.createElement("button");
        project.classList.add("project");
        project.dataset.id = projectObj.id;
        project.textContent = projectObj.name;

        const deleteProject = document.createElement("div");
        deleteProject.classList.add("delete-project");
        deleteProject.textContent = "X";

        project.appendChild(deleteProject);
        
        return project;
    }

    static createTask(taskObj) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task");
        if (taskObj.isDone) {
            taskContainer.classList.add("done");
        }

        taskContainer.dataset.id = taskObj.id;

        const title = document.createElement("h3");
        title.textContent = taskObj.title;

        const description  = document.createElement("p");
        description.textContent = taskObj.description;

        const dueDateContainer = document.createElement("div");
        dueDateContainer.classList.add("date");
        const dueDateText = document.createElement("div");
        dueDateText.textContent = "Due Date: ";
        const dueDate = document.createElement("div");
        dueDate.textContent = taskObj.dueDate || "No Date";
        dueDateContainer.appendChild(dueDateText);
        dueDateContainer.appendChild(dueDate);

        const priorityContainer = document.createElement("div");
        priorityContainer.classList.add("priority");
        const priorityText = document.createElement("div");
        priorityText.textContent = "Priority: ";
        const priority = document.createElement("div");
        priority.textContent = taskObj.priority;
        priorityContainer.appendChild(priorityText);
        priorityContainer.appendChild(priority);

        const controls = document.createElement("div");
        controls.classList.add("controls");
        const doneBtn = document.createElement("button");
        doneBtn.textContent = (taskObj.isDone)? "Mark as undone" : "Mark as done";
        doneBtn.classList.add("toggle");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        controls.appendChild(doneBtn);
        controls.appendChild(deleteBtn);

        taskContainer.appendChild(title);
        taskContainer.appendChild(description);
        taskContainer.appendChild(dueDateContainer);
        taskContainer.appendChild(priorityContainer);
        taskContainer.appendChild(controls);

        return taskContainer;
    }

    static createAllTasks(taskObj) {
        const taskElement = this.createTask(taskObj);
        taskElement.querySelector("h3").textContent += ` (${taskObj.originProjectName})`;

        return taskElement;
    }

    static createAllTasksProject(projectObj) {
        const projectElement = this.createProject(projectObj);
        projectElement.querySelector(".delete-project").remove();
        projectElement.classList.add("all-project");

        return projectElement;
    }

    static applySelectedStyle(projectElement) {
        const projectElements = document.querySelectorAll(".project");
        projectElements.forEach((project) => project.classList.remove("selected"));
        projectElement.classList.add("selected");
    }
}