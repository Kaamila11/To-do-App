const fs = require('fs');

let tasks = [];

function loadTasks() {
  try {
    const data = fs.readFileSync('todo.json', 'utf8');
    tasks = JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing the JSON file:', error);
  }
}

function saveTasks() {
  try {
    const data = JSON.stringify(tasks, null, 2);
    fs.writeFileSync('todo.json', data, 'utf8');
  } catch (error) {
    console.error('Error saving tasks to the JSON file:', error);
  }
}

function addTask(task) {
  const taskId = tasks.length + 1;
  tasks.push({ id: taskId, task: task });
  console.log(`Task added with ID: ${taskId}`);
  saveTasks();
}

function updateTask(id, updatedTask) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.task = updatedTask;
    console.log(`Task updated with ID: ${id}`);
    saveTasks();
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    console.log(`Task deleted with ID: ${deletedTask.id}`);
    saveTasks();
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
}

function displayTasks() {
  console.log('Tasks:');
  tasks.forEach(task => {
    console.log(`ID: ${task.id}, Task: ${task.task}`);
  });
}

module.exports = {
  loadTasks,
  addTask,
  updateTask,
  deleteTask,
  displayTasks
};