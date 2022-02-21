import {saveTask, getTasks, onGetTasks, deleteTasks, getTask, updateTask} from './firebase.js';
const taskForm = document.getElementById(`task-form`)
const tasksContainer = document.getElementById(`tasks-container`)

let editStatus = false;
let id = "";

window.addEventListener(`DOMContentLoaded`,async() =>{
    onGetTasks((querySnapshot)=>{
        tasksContainer.innerHTML=""

        querySnapshot.forEach(doc => {
            const tasks = doc.data()
            tasksContainer.innerHTML+= `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5">${tasks.title}</h3>
                    <p>${tasks.description}</p>
                    <div class="">
                        <button class="btn btn-primary btn-delete " data-id="${doc.id}">Eliminar</button>
                        <button class="btn btn.secundary btn-edit " data-id="${doc.id}">Editar</button>
                    </div>
                </div>
            `;
        });

        const btnsDelete = tasksContainer.querySelectorAll(`.btn-delete`)

        btnsDelete.forEach(btn => {
            btn.addEventListener(`click`,({target: {dataset}})=>{
                deleteTasks(dataset.id)
            })
        })

        const btnsEdit = tasksContainer.querySelectorAll(`.btn-edit`)
        btnsEdit.forEach(btn =>{
            btn.addEventListener(`click`,async(e)=>{
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()

                taskForm[`task-title`].value = task.title
                taskForm[`task-description`].value = task.description

                editStatus = true;
                id = doc.id;
                taskForm["btn-task-save"].innerText = "actualizar"
            })
        })


    });
});

taskForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const title = taskForm[`task-title`]
    const description = taskForm[`task-description`]

    if (!editStatus){
        saveTask(title.value, description.value);
    }else{
        updateTask(id, {
            title: title.value,
            description: description.value,

        });

        editStatus = false;
    }

    taskForm.reset()

   

})
