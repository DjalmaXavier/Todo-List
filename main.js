window.addEventListener('load', () => {

    const form = document.getElementById('task_form')
    const textTask = document.getElementById('task_input')
    const list = document.getElementById('tasks')
    loadTasksFromLocalStorage()

    form.addEventListener('submit', (e) => {

        e.preventDefault();


        const task = textTask.value

        if (!task) {
            alert("Preencha o campo de tarefas para que seja adicionado a lista!")
            return
        }

        createDiv(task);

        addTaskToLocalStorage(task)

        textTask.value = "";


        function addTaskToLocalStorage(task) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    })

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(task => {
            createDiv(task);
        });
    }

    function createDiv(task) {
        const taskDiv = document.createElement('div')
        taskDiv.classList.add("task_div");

        const divValue = document.createElement('div');

        const taskInput = document.createElement('input');
        taskInput.classList.add("task_inp");
        taskInput.type = "text";
        taskInput.value = task;
        taskInput.maxLength = 200;
        taskInput.setAttribute('readonly', 'readonly');

        const taskButtons = document.createElement('div')
        taskButtons.classList.add("task_buttons")

        const editButton = document.createElement('button')
        editButton.innerHTML = 'Editar'
        editButton.classList.add("btn_edit");


        const removeButton = document.createElement('button')
        removeButton.innerHTML = 'Remover'
        removeButton.classList.add("btn_remove");


        taskButtons.appendChild(editButton);
        taskButtons.appendChild(removeButton);
        divValue.appendChild(taskInput);
        taskDiv.appendChild(divValue);
        taskDiv.appendChild(taskButtons);
        list.appendChild(taskDiv);


        removeButton.addEventListener('click', () => {
            removeTaskFromLocalStorage(task)
            list.removeChild(taskDiv);
        })


        editButton.addEventListener('click', () => {

            if (editButton.innerHTML == 'Editar') {
                editButton.innerHTML = 'Salvar';
                taskInput.removeAttribute('readonly');
                taskInput.focus();
            } else {
                taskInput.setAttribute('readonly', 'readonly');
                editButton.innerHTML = 'Editar';
                updateTaskInLocalStorage(task, taskInput.value)
            }
        })
    }

    function removeTaskFromLocalStorage(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function updateTaskInLocalStorage(oldTask, newTask) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(t => (t === oldTask ? newTask : t));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

})
