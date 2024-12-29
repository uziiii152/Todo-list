document.addEventListener('DOMContentLoaded',() => {
const inputTask = document.getElementById("inputTask")
const addTask = document.getElementById("addTask")
const taskAdded = document.getElementById("taskAdded")

let task =JSON.parse(localStorage.getItem('task')) || []

task.forEach((tasks) => renderTask(tasks));

addTask.addEventListener('click',() => {
    let tasktext = inputTask.value.trim()
    if (tasktext === "") return;
    let newTask ={
        id: Date.now(),
        text: tasktext,
        completed:false
    };
    task.push(newTask)
    saveTasks();
    inputTask.value = ""
    console.log(task)

})
function renderTask(tasks){
    const li = document.createElement("li")
    li.setAttribute("data-id",tasks.id)
    if (tasks.completed) li.classList.add("completed")
    li.innerHTML =`
    <span>${tasks.text}</span>
    <button>Delete</button>`
    li.addEventListener('click',(e)=>{
        if (e.target.tagName === 'BUTTON') return;
        tasks.completed = !tasks.completed
        li.classList.toggle(tasks.completed)
        saveTasks()
    })
    taskAdded.appendChild(li)
}

function saveTasks(){
    localStorage.setItem('task',JSON.stringify(task))
}
})
