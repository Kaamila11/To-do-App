const readline = require('readline');
const todo = require('./todo');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser() {
  rl.question('Enter a command (add/update/delete/display/exit): ', (command) => {
    switch (command) {
      case 'add':
        rl.question('Enter the task: ', (task) => {
          todo.addTask(task);
          promptUser();
        });
        break;

      case 'update':
        rl.question('Enter the task ID to update: ', (id) => {
          rl.question('Enter the updated task: ', (updatedTask) => {
            todo.updateTask(parseInt(id), updatedTask);
            promptUser();
          });
        });
        break;

      case 'delete':
        rl.question('Enter the task ID to delete: ', (id) => {
          todo.deleteTask(parseInt(id));
          promptUser();
        });
        break;

      case 'display':
        todo.displayTasks();
        promptUser();
        break;

      case 'exit':
        rl.close();
        break;

      default:
        console.log('Invalid command. Please try again.');
        promptUser();
        break;
    }
  });
}

// Load tasks from the JSON file
todo.loadTasks();

// Start the command-line interface
promptUser();