// Генерируем ID
const generateId = (a) => {
    for (let i = 0; i < todoList.length; i++) {
        a += 1;
    }
    return a.toString();
};

const listGroup = document.querySelector(".list-group");
const form = document.getElementById('form');
const formControl = document.querySelector('.form-control');

let todoList = JSON.parse( localStorage.getItem('todo') ) || [];

const renderOperation = (operation) => {

    const className = operation.id % 2 === 0 ?
        'list-group-item__dark' :
        'list-group-item__light';

    const listItem = document.createElement('li');

    listItem.classList.add('list-group-item');
    listItem.classList.add(className);

    listItem.innerHTML = `${operation.description}
        <button class="list-group__delete" data-id='${operation.id}'>x</button>
    `;

    listGroup.append(listItem);
};

const addOperation = (event) => {
    // отмена перезагрузки браузера
    event.preventDefault();

    const formControlValue = formControl.value;

    formControl.style.borderColor = '';

    if (formControlValue) {

        const operation = {
            id: generateId(1),
            description: formControlValue,
        }

        todoList.push(operation);
        init();
        // console.log(todoList);

    } else {
        if (!formControlValue) formControl.style.borderColor = 'red';
    }

    formControl.value = '';
};

const deleteOperation = (event) => {
    const target = event.target;
    if (target.classList.contains('list-group__delete')) {
        // .contains проверяет есть ли данный класс и возвращает true млм false

        todoList = todoList.filter(operation => operation.id !== target.dataset.id);

        init();
    }
};

const init = () => {

    listGroup.textContent = '';

    todoList.forEach(renderOperation); // добавляем на страницу элементы

    localStorage.setItem('todo', JSON.stringify(todoList));

    // stringify - переводит все в строку
};

form.addEventListener('submit', addOperation);
listGroup.addEventListener('click', deleteOperation);


init();