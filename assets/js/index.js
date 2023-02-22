// создаю объект на основе класса InfoPopup
const detailPopup = new InfoPopup(document.querySelector('.item-details'))

// создаю констунту с элементом, куда будем выводить продукты
const itemsEl = document.querySelector('.items')

// слушатель наведения мыши на продукт
function itemMouseEnterHandler (e) {
	const boundingClientRect = e.target.getBoundingClientRect()
	const x = boundingClientRect.left + boundingClientRect.width
	const y = boundingClientRect.y
	detailPopup.position = { x, y }
	detailPopup.data = {
		title: e.target.getAttribute('data-title'),
		description: e.target.getAttribute('data-description'),
		price: e.target.getAttribute('data-price'),
	}
	detailPopup.show()
}

// функция, генерирующая функцию для сортировки
function itemSortFunc (sort = 'id', sortDir = true) {
	return ((a, b) => {
		// если у одного из элементов нет нужного поля,
		// то останавливаю выполнение функции
		if (!a[sort] || !b[sort]) {
			return (false)
		}
		if (sortDir) {
			return (a[sort] < b[sort] ? 1 : -1)
		}
		return (a[sort] > b[sort] ? 1 : -1)
	})
}

// функция для отрисовки продуктов
async function render () {
	// беру выбранный лимит
	const limit = document.querySelector('[name="limit"]').value
	// получаю продукты
	const items = await API.getItems(limit)

	// если продукты не получены, то останавливаю выполнение функции
	if (!items) {
		return (false)
	}

	// беру выбранное поле и направление для сортировки
	const sort = document.querySelector('[name="sort"]').value
	const sortDir = document.querySelector('[name="sort-dir"]').value === 'desc'

	// сортирую в зависимости от выбранных фильтров
	items.sort(itemSortFunc(sort, sortDir))

	// очищаю список
	itemsEl.innerHTML = ''

	// прохожусь по ним циклом
	for (const item of items) {
		// клонирую шаблон
		let clone = document.querySelector('template#item').content.cloneNode(true)

		// к корневому элементу шаблона привязываю нужные параметры
		let itemEl = clone.querySelector('.item')
		itemEl.setAttribute('data-id', item.id)
		itemEl.setAttribute('data-title', item.title)
		itemEl.setAttribute('data-price', item.price)
		itemEl.setAttribute('data-rating', item.rating)
		itemEl.setAttribute('data-description', item.description)
		itemEl.setAttribute('draggable', true)
		// устанавливаю слушатель при наведении мыши
		itemEl.addEventListener('mouseenter', itemMouseEnterHandler)
		// устанавливаю слушатель при отведении мыши, привязывая контекст
		itemEl.addEventListener('mouseleave', detailPopup.hide.bind(detailPopup))

		// вывожу заголовок товара
		let titleEl = clone.querySelector('.title')
		titleEl.innerText = item.title

		// добавляю клонированный элемент в список
		itemsEl.append(clone)
	}
}

// вешаю на все select в блоке фильтров обработчик
document.querySelectorAll('.filters select')
	.forEach((el) => {
		el.addEventListener('change', render)
	})

// рисую продукты
render()