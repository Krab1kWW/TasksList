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

// кнопки фильтров
const filterButtons = document.querySelectorAll('#filters button');

// кнопка "Очистить выполненные задачи"
const clearCompletedBtn = document.getElementById('clearCompleted')


function addTask()
{
    let text = taskInput.value;
    if (text.trim() === "")
            {
                showNotification("Введите текст задачи!", "error");
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
            showNotification("Задача добавлена!", "success");

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
            <input type="checkbox" class="task-checkbox" data-id="${filteredTasks[i].id}" ${filteredTasks[i].completed ? 'checked' : ''}>
            <span class="task-text ${filteredTasks[i].completed ? 'completed' : ''}" data-id="${filteredTasks[i].id}">${filteredTasks[i].text}</span>
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
    
    document.querySelector('[data-filter="all"] .count').textContent = tasks.length;
    document.querySelector('[data-filter="active"] .count').textContent = tasks.filter(t => !t.completed).length;
    document.querySelector('[data-filter="completed"] .count').textContent = tasks.filter(t => t.completed).length;

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
            showNotification("Задача удалена!", "success")
            break;
        }
    }
    showNotification("Задача удалена!", "success")
    renderTasks();
    updateStats();
}


function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Заголовок в зависимости от типа
    let title = 'Успешно!';
    if (type === 'error') title = 'Ошибка!';
    else if (type === 'info') title = 'Информация';

    notification.innerHTML = `
        <div class="notification-bar">
            <svg width="16" height="100%" viewBox="0 0 16 96" xmlns="http://www.w3.org/2000/svg">
                <path d="M 8 0 Q 4 4.8, 8 9.6 T 8 19.2 Q 4 24, 8 28.8 T 8 38.4 Q 4 43.2, 8 48 T 8 57.6 Q 4 62.4, 8 67.2 T 8 76.8 Q 4 81.6, 8 86.4 T 8 96 L 0 96 L 0 0 Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="notification-body">
            <p class="notification-title">${title}</p>
            <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
        </button>
    `;

    container.appendChild(notification);

    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    });

    // Анимация появления
    setTimeout(() => notification.classList.add('show'), 10);

    // Автоудаление через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}



//Удаление и отметка задачи как "Выполненная"
taskList.addEventListener('click', function(e){
    if(e.target.matches('.task-checkbox'))
    {
        let id = Number(e.target.dataset.id)
        showNotification("Задача выполнена!", "success");
        toggleTask(id)
        
        
    }

    if (e.target.matches('.btn-delete'))
    {
        let id = Number(e.target.dataset.id)
        deleteTask(id)
        
    }
});


taskList.addEventListener('dblclick', function(e)
{  

    if (e.target.matches('.task-text')) {
        let id = Number(e.target.dataset.id);

        for (let i = 0; i < tasks.length; i++)
        {
            if (tasks[i].id === id)
            {
                const task = tasks[i];
                const input = document.createElement('input');
                input.type = 'text';
                input.value = task.text;
                e.target.replaceWith(input);

                input.focus();
                input.select();

                
                function save() {
                    const newText = input.value.trim();
                    if (newText === '')
                    {
                        showNotification("Текст не может быть пустым!", "error");
                    }
                    else
                    {
                        task.text = newText;
                        showNotification("Задача обновлена!", "success");
                    }
                    
                    renderTasks();
                }

                input.addEventListener('blur', save);

      
                input.addEventListener('keypress', function(event) {
                    if (event.key === 'Enter') {
                        input.blur(); 
                    }
                });

                break; 
            }
        }
    }
});







//Добавление задачи
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) =>
    {
         if (e.key === 'Enter') addTask();  
    });

//Кнопка очистки
clearCompletedBtn.addEventListener('click', function(e){

    tasks = tasks.filter(function(task)
    {
        return task.completed === false;
    })  
    showNotification("Выполненные задачи очищены!", "info");
    renderTasks();
    updateStats();    
    
    });    


//Фильтры
filterButtons.forEach(function(button)
{
    button.addEventListener('click', function(e) {
        currentFilter = e.currentTarget.dataset.filter

        filterButtons.forEach(function(btn){
            btn.classList.remove('active')
        });
        
        this.classList.add('active')

        // showNotification("Фильтр применён", "info");
        renderTasks();
    });
});