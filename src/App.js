import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('https://ksnirob.github.io/TaskManager:5000/tasks')
    const data = await res.json()

    return data
  }

    // fetch tasks
    const fetchTask = async (id) => {
      const res = await fetch(`https://ksnirob.github.io/TaskManager:5000/tasks/${id}`)
      const data = await res.json()
  
      return data
    }

  // add task
  const addTask = async (task) => {
    const res = await fetch('https://ksnirob.github.io/TaskManager:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // console.log(task)
    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`https://ksnirob.github.io/TaskManager:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    // console.log('Delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const upTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`https://ksnirob.github.io/TaskManager:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(upTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: data.reminder} : task
    ))
  }

  return (
    <Router>
      <div className="container">
        <Header title="Task Manager" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder} /> : 'No Tasks Found'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
