const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [
  { id: 1, text: 'Вивчити HTML', completed: true },
  { id: 2, text: 'Вивчити CSS', completed: true },
  { id: 3, text: 'Вивчити JavaScript', completed: false }
];

function newTodo() {
  const todoText = prompt('Введіть нове завдання:');
  if (todoText && todoText.trim() !== '') {
    const newTodoItem = {
      id: Date.now(), 
      text: todoText.trim(),
      completed: false
    };
    todos.push(newTodoItem);
    console.log('Поточний масив справ після додавання:', todos);
    render();
    updateCounter();
  }
}

function renderTodo(todo) {
  const textClass = todo.completed ? 'text-success text-decoration-line-through' : '';
  const isChecked = todo.completed ? 'checked' : '';
  return `
    <li class="list-group-item">
      <input 
        type="checkbox" 
        class="form-check-input me-2" 
        id="todo-${todo.id}" 
        ${isChecked} 
        onclick="checkTodo(${todo.id})"
      />
      <label for="todo-${todo.id}">
        <span class="${textClass}">${todo.text}</span>
      </label>
      <button 
        class="btn btn-danger btn-sm float-end" 
        onclick="deleteTodo(${todo.id})"
      >
        delete
      </button>
    </li>
  `;
}

function render() {
  const htmlContent = todos.map(todo => renderTodo(todo)).join('');
  list.innerHTML = htmlContent;
}

function updateCounter() {
  const totalItems = todos.length;
  const uncheckedItems = todos.filter(todo => !todo.completed).length;
  itemCountSpan.textContent = totalItems;
  uncheckedCountSpan.textContent = uncheckedItems;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
}

function checkTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  render();
  updateCounter();
}

function saveToFile() {
  if (todos.length === 0) {
    alert('Списку справ немає');
    return;
  }
  let fileContent = "Завдання:\n";
  todos.forEach((todo, index) => {
    const status = todo.completed ? "[X] Виконано" : "[ ] Не виконано";
    fileContent += `${index + 1}. ${status} — ${todo.text}\n`;
  });
  const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.download = 'todo-list.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

render();
updateCounter();
