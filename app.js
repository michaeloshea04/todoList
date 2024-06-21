//Task factory function
function createTask(title, description, dueDate, priority) {
    return {
        title,
        description,
        dueDate,
        priority,
        printTask(){
            console.log(`Title: ${this.title}, Description: ${this.description}, Due date: ${this.dueDate}, Priority: ${this.priority}`);
        }
    };
}

//Project factory function
function createProject(name){
    return {
        name,
        taskArray: [],
        addTask: function(task) {
            this.taskArray.push(task);
        },
        removeTask: function(index){
            if (index > -1 && index < taskArray.length) {
                taskArray.splice(index, 1);
            }
        },
        printTask: function() {
            console.log(`Project: ${this.name}`);
            this.taskArray.forEach(task => task.printTask());
        }
    };
}

//array to hold tasks **up to here **
let projects = [];
let currentProjectIndex = 0; 

//create the default project
function createDefaultProject() {
    const defaultProject = createProject("Default");
    projects.push(defaultProject);
    updateProjectSelect();
}

createDefaultProject();


//Adding a new project
function addProject(name){
    const newProject = createProject(name);
    projects.push(newProject);
    updateProjectSelect();
}

//Update project select dropdown
function updateProjectSelect() {
    const projectSelect = document.getElementById('project-select');  //need to create this in html
    projectSelect.innerHTML = '';
    projects.forEach((project, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
}

//Switching to a different project
function switchProject(index) {
    if (index >= 0 && index < projects.length) {
        currentProjectIndex = index;
        renderTasks();
    }
}

//Adding a task to the current project
function addTaskToCurrentProject(title, description, dueDate, priority){
    const newTask = createTask(title, description, dueDate, priority);
    projects[currentProjectIndex].addTask(newTask);
    renderTasks();
    
}

// Removing a todo by index
function removeTaskFromCurrentProject(index) {
    projects[currentProjectIndex].removeTask(index);
    renderTasks();
}


//Render task to the DOM
function renderTasks(){
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    projects[currentProjectIndex].taskArray.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `Title: ${task.title}, Description: ${task.description}, Due date: ${task.dueDate}, Priority: ${task.priority}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeTaskFromCurrentProject(index);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}


// Handle project form submission
document.getElementById('project-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const projectName = document.getElementById('projectName').value;
    addProject(projectName);
    this.reset();
});

// Handle project selection
document.getElementById('project-select').addEventListener('change', function() {
    switchProject(this.value);
});


//Handle form submission
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    addTaskToCurrentProject(title, description, dueDate, priority);
    this.reset();
})