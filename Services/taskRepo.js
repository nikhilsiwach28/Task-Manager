class TaskRepository {
    constructor() {
      this.tasks = [];
      this.lastTaskId = 0;
    }
  
    getAllTasks() {
      return this.tasks;
    }
  
    getTaskById(id) {
      return this.tasks.find(task => task.id === id);
    }
    
    getTasksByPriority(level) {
      return this.tasks.filter(task => task.priority === level);
    }
    
    createTask(task) {
      const newTask = {
        id: ++this.lastTaskId,
        title: task.title,
        description: task.description,
        priority: task.priority || 'medium', // Default to 'medium' if not provided
        completed: task.completed || false,
      };
      this.tasks.push(newTask);
      return newTask;
    }
  
    updateTask(id, updatedTask) {
      const taskToUpdate = this.tasks.find(task => task.id === id);
      console.log("nikhil:task2update". taskToUpdate)
      console.log("nikhil:updatedTask". updatedTask)
      if (taskToUpdate) {
        // Update attributes if they exist in the request
        taskToUpdate.title = updatedTask.title || taskToUpdate.title;
        taskToUpdate.description = updatedTask.description || taskToUpdate.description;
        taskToUpdate.completed = updatedTask.completed !== undefined ? updatedTask.completed : taskToUpdate.completed;
        taskToUpdate.priority = updatedTask.priority || taskToUpdate.priority;
      }
    }
    
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  }
  
  module.exports = TaskRepository;
  