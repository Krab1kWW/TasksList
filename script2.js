let tasks =  [];
let nextId = 1;
let currentFilter = 'all';


// поле ввода
const   taskInput  = document.querySelector('.input');

// кнопка "Добавить"
const  addButton  = document.querySelector('.add-button');

// список задач
const  taskList = document.getElementById('taskList');

// блок статистики
const  stats = document.getElementById('stats')

// контейнер с кнопками
const filters = document.getElementById('filters')

// кнопка "Очистить выполненные задачи"
const clearCompletedBtn = document.getElementById('clearCompleted')


function addTask()
{
    let text = taskInput.value;
    if (text.trim() === "")
            {
                alert("Введите текст.")
            }

     else
        {
            let newTask = {
                id: nextId,
                text: text.trim(),
                completed: false
            };

            tasks.push(newTask)
            nextId++
            alert("Задача добавлена")

            taskInput.value = ''
            renderTasks();
            updateStats();
        }
    
}


function renderTasks()
{
    taskList.innerHTML = '';  // Очистить список
    let filteredTasks = [];
    if (currentFilter == "all")
    {
        filteredTasks = tasks;
    }

    else if (currentFilter == 'active')
    {
        filteredTasks = tasks.filter(t => !t.completed)
    }

    else if (currentFilter == 'completed')
    {
        filteredTasks = tasks.filter(t => t.completed)
    }


    for (let i = 0; i < filteredTasks.length; i++)
        {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
            <input type="checkbox" data-id="${filteredTasks[i].id}"  ${filteredTasks[i].completed ? 'checked' : ''}>
            <span class="task-text ${filteredTasks[i].completed ? 'completed' : ''}">${filteredTasks[i].text}</span>
            <button class="btn-delete" data-id="${filteredTasks[i].id}">Удалить</button>
             `;
            taskList.appendChild(li);
        }
    
    updateStats();    

}


function updateStats()
{
    let allTasks = tasks.length;
    let completedTasks = tasks.filter(t => t.completed).length;
    let activeTasks = tasks.filter(t => !t.completed).length;

    stats.textContent = `Всего: ${allTasks} | Выполнено: ${completedTasks} | Активных: ${activeTasks}`
    

}


function toggleTask(id)
{
    for (let i = 0; i < tasks.length; i++)
    {
        if(tasks[i].id === id)
        {
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }
    renderTasks();
    updateStats();
  
}
function deleteTask(id)
{
    for (let i = 0; i < tasks.length; i++)
    {
        if(tasks[i].id === id)
        {
            tasks.splice(i, 1)
            break;
        }
    }
    renderTasks();
    updateStats();
}



taskList.addEventListener('click', function(e){
    if(e.target.matches('.task-checkbox'))
    {
        let id = Number(e.target.dataset.id)
        toggleTask(id)
    }

    if (e.target.matches('.btn-delete'))
    {
        let id = Number(e.target.dataset.id)
        deleteTask(id)
    }
});





addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) =>
    {
         if (e.key === 'Enter') addTask();  
    });