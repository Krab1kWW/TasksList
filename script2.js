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
            renderTasks()
            updateStats()
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
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="btn-delete">Удалить</button>
             `;

        }
    
    updateStats()    

}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) =>
    {
         if (e.key === 'Enter') addTask();  
    });