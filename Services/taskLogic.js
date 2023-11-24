class TaskLogic {
    constructor(taskRepository) {
      this.taskRepository = taskRepository;
    }
  
    getAllTasks() {
      return this.taskRepository.getAllTasks();
    }
  
    getTaskById(id) {
      return this.taskRepository.getTaskById(id);
    }

    getTasksByPriority(level) {
      return this.taskRepository.getTasksByPriority(level);
    }
  
    createTask(task) {
      return this.taskRepository.createTask(task);
    }
  
    updateTask(id, updatedTask) {
      return this.taskRepository.updateTask(id, updatedTask);
    }
  
    deleteTask(id) {
      this.taskRepository.deleteTask(id);
    }
  }
  
  module.exports = TaskLogic;
  