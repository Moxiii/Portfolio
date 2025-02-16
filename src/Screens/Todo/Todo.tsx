import "./Todo.scss"
import {JSX, useEffect} from "react";
import {useState} from "react";
export default function Todo():JSX.Element {
    const [task , setTask] = useState('')
    const [tasks , setTasks] = useState<string[]>([])
    useEffect(()=>{
    const savedTask = localStorage.getItem("tasks");
    if (savedTask){
        setTasks(JSON.parse(savedTask))
    }
    },[])
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
const addTask = ()=> {
    if(task.trim()!== ''){
        setTasks([...tasks , task])
        setTask('');
    }
}
const deleteTask = (index: number)=>{
    const newTasks = tasks.filter((_, i ) => i !== index);
    setTasks(newTasks);
    }
    return(
        <>
        <div className="todo-container">
            <div className="todo-input">
                <input type="text" value={task} onChange={(e)=> setTask(e.target.value)} placeholder="Add new task"/>
                <button onClick={addTask}> ADD</button>
            </div>
            <div className="tasks">
                <ul>
                    {tasks.map((task, index)=>(
                        <li key={index}>{task}
                            <button onClick={()=> deleteTask(index)}> delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}