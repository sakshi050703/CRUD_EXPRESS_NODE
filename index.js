const express = require('express')
const app = express()
app.use(express.json())


let tasks = [];

//Get Data
app.get('/tasks', (req, res) => {
  res.status(200).send(tasks)
})


//Get Data by Id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find((e) => e.id === parseInt(req.params.id))
  if (task) {
    res.status(200).send(task)
  } else {
    res.status(404).send('Task Not Found')
  }
})


//Add Data by using POST
app.post('/tasks/add', (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send('Title and Description are required')
  }
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description
  }
  tasks.push(newTask)
  res.status(201).send(newTask)
})


//Edit Data by using PUT
app.put('/tasks/update/:id', (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send('Title and Description are required')
  }
  const taskget = tasks.find((e) => e.id === parseInt(req.params.id))
  if (taskget) {
    taskget.title = req.body.title
    taskget.description = req.body.description
    res.status(200).send(taskget)
  } else {
    tasks.status(404).send('Task Not Found')
  }
})


//Delete Data by using Delete
app.delete('/tasks/delete/:id', (req, res) => {
  const taskget = tasks.find((e) => e.id === parseInt(req.params.id))
  if (taskget) {
    const index = tasks.indexOf(taskget)
    tasks.splice(index, 1)
    res.status(200).send(taskget)
  } else {
    tasks.status(404).send('Task Not Found')
  }
})



app.listen(8000, () => {
  console.log('8000 port is running')
})