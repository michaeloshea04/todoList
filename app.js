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

//array to hold tasks
let taskArray = [];

//Adding a task
function addTask(title, description, dueDate, priority){
    const newTask = createTask(title, description, dueDate, priority);
    taskArray.push(newTask);
    renderTasks();
    
}

// Removing a todo by index
function removeTask(index) {
    if (index > -1 && index < taskArray.length) {
        taskArray.splice(index, 1);
    }
    renderTasks();
}

//Render task to the DOM
function renderTasks(){
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    taskArray.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `Title: ${task.title}, Description: ${task.description}, Due date: ${task.dueDate}, Priority: ${task.priority}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeTask(index);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });

}

//Handle form submission
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    addTask(title, description, dueDate, priority);
    this.reset();
})