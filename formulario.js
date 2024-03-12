const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Carregar tarefas do armazenamento local quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
});

// Adicionar nova tarefa
form.addEventListener('submit', e => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText !== '') {
        addTask(taskText, false);
        input.value = '';
        input.focus();
        saveTasks();
    }
});

// Marcar tarefa como concluída ou excluir
taskList.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const li = e.target.parentElement;
        if (e.target.classList.contains('complete-btn')) {
            li.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-btn')) {
            li.remove();
        }
        saveTasks();
    }
});

// Adicionar tarefa à lista
function addTask(taskText, completed) {
    const li = document.createElement('li');
    li.className = 'task-item' + (completed ? ' completed' : '');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="complete-btn">${completed ? 'Desfazer' : 'Concluir'}</button>
        <button class="delete-btn">Excluir</button>
    `;
    taskList.appendChild(li);
}

// Salvar tarefas no armazenamento local
function saveTasks() {
    const tasks = [...taskList.querySelectorAll('.task-item')].map(li => ({
        text: li.querySelector('span').innerText,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
