const express= require("express")

const app = express()

const userRecord = [
    {id: 1, username: 'user1', password: 'user1'}
]

var taskRecord = [
    {id: 1, title: 'New task 1', description: 'This is a new task', dueDate:'19-03-24', category: 'Personal', status:'Incomplete', priority: 'Low'}
]

app.put('/auth', (req, res)=>{
    const {username, password} = req.body
    const user = userRecord.find(user => user.password===password && user.username === username)
    if ( user ){
        res.send("login successful")
    }    
})

app.post("/addTask", (req, res) => {
    const {userId, title, description, dueDate, category, status, priority} = req.body
    const task = {
      id: taskRecord.length + 1,
      userId: userId,
      title: title,
      description: description,
      dueDate: dueDate,
      category: category,
      status: "Incomplete",
      priority: priority,
    };
    taskRecord.push(task);
    res.status(201).send({message: 'New task added successfully! ', task: task});
  });
  
  app.put("/category", (req, res) => {
    const {id, category} = req.body
    const task = taskRecord.find((t) => t.id == id);
    if (!task) return res.status(404).send("Task not found.");
    task.category = category;
    res.send(task);
  });
  
  app.put("/status", (req, res) => {
    const {id, status} = req.body
    const task = taskRecord.find((t) => t.id == id );
    if (!task) return res.status(404).send("Task not found.");
    task.status = status;
    res.send(task);
  });
  
  app.get("/sort", (req, res) => {
    
  });
  
  app.put("/priority", (req, res) => {
    const {id, priority} = req.body
    const task = taskRecord.find((t) => t.id === id);
    if (!task) return res.status(404).send("Task not found.");
    task.priority = priority;
    res.send(task);
  });
  
  app.listen(3000, () => console.log("Server running on port 3000"));