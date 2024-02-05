window.addEventListener('load', () => {

    const form = document.getElementById('task_form')
    const textTask = document.getElementById('task_input')
    const list = document.getElementById('tasks')
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = textTask.value

        if (!task) {
            alert("Preencha o campo de tarefas para que seja adicionado a lista!")
            return
        }

        const taskDiv = document.createElement('div')
        /*adicionar classe*/

        const divValue = document.createElement('div');
        /*adicionar classe*/

        const taskInput = document.createElement('input');
        /*adicionar classe*/
        taskInput.type = "text";
        taskInput.value = task;
        taskInput.setAttribute('readonly', 'readonly');

        const taskButtons = document.createElement('div')


        const editButton = document.createElement('button')
        editButton.innerHTML = 'Editar'

        const removeButton = document.createElement('button')
        removeButton.innerHTML = 'Remover'



        taskButtons.appendChild(editButton);
        taskButtons.appendChild(removeButton);
        divValue.appendChild(taskInput);
        taskDiv.appendChild(divValue);
        taskDiv.appendChild(taskButtons);
        list.appendChild(taskDiv);


        removeButton.addEventListener('click', () => {
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
            }
        })

        textTask.value = "";


    })
})
