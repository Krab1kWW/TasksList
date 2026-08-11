let tasks =  [];
let nextId = 1;


console.log("Добро пожаловать в менеджер задач!")
let status = true



function showMenu() 
    {
        console.log("1 – Добавить задачу \n2 – Показать все задачи \n3 – Отметить задачу как выполненную \n4 – Удалить задачу \n5 – Показать только выполненные  \n6 – Показать только активные (невыполненные) \n0 – Выход ");
    }

function  addTask()
    {      
        console.log("Выбрана команда 1");
        let text = prompt("Введите текст задачи:")

        if (text == null || text.trim() === "")
            {
                alert("Задача не может быть пустой")
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
            console.log("Задача добавлена")
        }
    }

function showTasks(filter)
    {
        let all = tasks.length
        let completed = tasks.filter(t => t.completed).length
        let active = tasks.filter(t => !t.completed).length
        console.log(`Всего:${all}| Выполнено: ${completed}| Активные:${active} `)
        if (filter == 'all')
            {
                let number_task = 1;
                for(let i = 0; i<tasks.length; i++)
                    {
                       printTask(tasks[i], number_task)        
                       number_task++;
                    }
            }

        else if( filter ==  'completed')
            {
                let number_task = 1;
                for(let i=0; i<tasks.length;i++)
                    {
                        if(tasks[i].completed == true)
                            {
                                printTask(tasks[i], number_task)        
                                number_task++;
                            }

                    }
            }
        else if( filter == 'active')
        {
            let number_task = 1;
                    for(let i=0; i<tasks.length;i++)
                    {
                        if(tasks[i].completed == false)
                            {
                                printTask(tasks[i], number_task)        
                                number_task++;
                            }

                    }
        }
        else
        {
            alert("Выбрано не правильное действие!")
        }
    }




function markTaskCompleted() 
    { 
        let number = prompt("Введите номер задачи:")
        let num = parseInt(number)
        let index = num - 1
        if (isNaN(num))
            {
                alert("Введите число!")
            }
        else if (index < 0 || index >= tasks.length)
            {
                alert("Задачи с таким номером нет!")

            }
        else if (tasks[index].completed == true)
            {
                alert("Задача уже выполнена!")
                console.log("Задача уже выполнена!")
            }

        else if (tasks[index].completed == false)
            {
                tasks[index].completed = true
                alert("Задача выполнена!")
                console.log("Выполнена!")
            }    

    }


function deleteTask()
    {
        let number = prompt("Введите номер задачи:")
        let num = parseInt(number)
        let index = num - 1
        if (isNaN(num))
            {
                alert("Введите число!")
            }
        else if (index < 0 || index >= tasks.length)
            {
                alert("Задачи с таким номером нет!")

            }
        else
        {   
            tasks.splice(index, 1) 
        }

    }

function getValidTaskNumber() 
    {
        let number = prompt("Введите номер задачи:")
        let num = parseInt(number)
        let index = num - 1
        if (isNaN(num))
            {
                return null
            }
        else if (index < 0 || index >= tasks.length)
            {
                return null

            }
        else
        {
            return index
        }
    }

function printTask(task, number)
    {
        let completed = task.completed ? 'x' : ' '
        let text = `${number}. [${completed}] ${task.text} `;              
        console.log(text)                    
    }

function editTask()
    {
        let index = getValidTaskNumber()

        if (index != null)
            {
                let newText = prompt("Введите новый текст:")
                if (newText == null || newText.trim() === "")
                    {
                        alert("Задача не может быть пустой")
                    }
                else
                    {
                        tasks[index].text = newText;
                        console.log("Задача обновлена!");
                    }
            }
    }

function clearCompleted()
    {
        let completedTasks = tasks.filter(t => t.completed);
        let completedTasksLength = completedTasks.length
        if (completedTasks.length == 0)
        {
            console.log("Нет выполненных задач для удаления")

        }
        else
        {
            tasks = tasks.filter(t => t.completed === false);
            let completed = `Удалено ${completedTasksLength}!`;          
            console.log(completed)
        }

    }

function searchTask()
    {
        let text = prompt("Введите текст задачи:")
        let lowText = text.toLowerCase()
        if (text == null || text.trim() === "")
            {
                alert("Введите текст.")
            }
        else  
        {
            let counter = 1
            for(let i = 0; i<tasks.length; i++)
            {
                let taskText = tasks[i].text
                let taskTextLow = taskText.toLowerCase()
                if (taskTextLow.includes(lowText))
                {
                    printTask(tasks[i], counter)
                    counter++
                }                             
            }
            if(counter === 1)
            {
                console.log("Задачи не найдены")
            }
        }
        
    }

function exit()
    {
       
        console.log("До свидания!");
        status = false;

                
    }



while (status)
    {
        showMenu();
        let comand = prompt("Введите номер команды:");
       
        switch(comand)
            {
                case '1' :  // Добавить задачу
                    addTask();
                    break;
                
                case '2': // Показать все задачи
                    showTasks('all');
                    break;

                case '3' : // Отметить задачу как выполненную
                    markTaskCompleted();                
                    break;
                
                case '4' : // Удалить задачу
                    deleteTask() ;
                    break;

                case '5' : // Показать только выполненные
                    showTasks('completed');
                    break;                               

                case '6' : //  Показать только активные (невыполненные)
                    showTasks('active');
                    break;

                case '7' : // Редактировать задачу
                    editTask()
                    break;

                case '8' : //  Удалить все выполненные
                    clearCompleted()
                    break;

                case '9' : // Найти задачу по тексту
                    searchTask()
                    break;

                case '0' : // Выход
                    exit()
                    break;
                
                default:
                    alert("Неизвестная команда! Введите число от 0 до 9.");
                    break;


            }

    }
