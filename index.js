let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

const loadTasks = () => {
	const savedTasks = localStorage.getItem("tasks");
	if (savedTasks) {
		return JSON.parse(savedTasks);
	}
	return items;
};

const getTasksFromDOM = () => {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	return Array.from(itemsNamesElements).map((element) => element.textContent);
};

const saveTasks = (tasks) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

const updateTasksStore = () => {
	saveTasks(getTasksFromDOM());
};

const createItem = (item) => {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		updateTasksStore();
	});

	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		updateTasksStore();
	});

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", "false");
		updateTasksStore();
	});

	return clone;
};

formElement.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const taskText = inputElement.value.trim();

	if (!taskText) {
		return;
	}

	const newItem = createItem(taskText);
	listElement.prepend(newItem);

	updateTasksStore();

	inputElement.value = "";
});

items = loadTasks();
items.forEach((item) => {
	const newItem = createItem(item);
	listElement.append(newItem);
});
