// создаю переменную для хранения перетасиваемого элемента
let droppableEl = null

// создаю константу для хранения контейнера
const container = document.querySelector('.items')

// вешаю слушатели на события перемещения
container.addEventListener('dragstart', (e) => {
	e.target.classList.add('dragging')
	// сохраняю в переменную элемент
	droppableEl = e.target
})
container.addEventListener('dragend', (e) => {
	e.target.classList.remove('dragging')
	// очищаю переменную
	droppableEl = null
})
container.addEventListener('dragover', (e) => {
	// отменяю действие по умолчанию, в данном случае
	// это убирает курсор перечеркнутого круга
	e.preventDefault()

	// поскольку событие может сработать и на дочернем
	// элементе продукта (допустим, title) - перебираю
	// родителей, пока не найду элемент продукта
	let target = e.target
	while (target && !target.classList.contains('item')) {
		target = target.parentElement
	}

	// если ничего не нашёл, то завершаю выполнение функции
	if (!target) {
		return (false)
	}

	// если нашёл тот же самый элемент, что перетаскивается
	// в данный момент, то завершаю выполнение функции
	if (droppableEl === target) {
		return (false)
	}

	
	// если нашёл элемент, расположенный прямо после
	// перетаскиваемого, то меняю элемент на следующий
	// (иначе пользователь не сможет расположить элемент
	// в конце списка)
	if (target === droppableEl.nextElementSibling) {
		target = target.nextElementSibling
	}

	// вставляю перетаскиваемый элемент перед target
	container.insertBefore(droppableEl, target)
})