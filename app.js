const express = require('express');
const bodyParser = require('body-parser');
const TaskRepository = require('./services/taskRepo');
const TaskLogic = require('./services/taskLogic');

const app = express();

app.use(bodyParser.json());

const taskRepository = new TaskRepository();
const taskLogic = new TaskLogic(taskRepository);

app.get('/tasks', (req, res) => {
  const tasks = taskLogic.getAllTasks();
  // Filtering by completion status
  const { completed } = req.query;
  if (completed !== undefined) {
    tasks = tasks.filter(task => task.completed === (completed === 'true'));
  }

  // Sorting by creation date
  const { sortBy } = req.query;
  if (sortBy === 'createdAt') {
    tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = taskLogic.getTaskById(req.params.id);
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  const createdTask = taskLogic.createTask(newTask);
  res.status(201).json(createdTask);
});

app.put('/tasks/:id', (req, res) => {
  const updatedTask = req.body;
  taskLogic.updateTask(req.params.id, updatedTask);
  res.send('Task updated successfully',updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  taskLogic.deleteTask(req.params.id);
  res.send('Task deleted successfully');
});


// Inside app.js
app.get('/tasks/priority/:level', (req, res) => {
  const { level } = req.params;
  const tasksByPriority = taskLogic.getTasksByPriority(level);
  res.json(tasksByPriority);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
