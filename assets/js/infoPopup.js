// создаю класс для более удобного взаимодействия
class InfoPopup {
	// в конструктор буду подавать элемент всплывающего окна
	constructor (el) {
		this.el = el

		// вешаю слушатели, обязательно привязываю контекст
		this.el.addEventListener('mouseenter', this.show.bind(this))
		this.el.addEventListener('mouseleave', this.hide.bind(this))
	}

	// создаю сеттер для даты
	set data (data = {}) {
		// заполняю поля попапа
		this.el.querySelector('.title').innerText = data.title || ''
		this.el.querySelector('.description').innerText = data.description || ''
		this.el.querySelector('.price').innerText = data.price || ''
	}

	// создаю сеттер для позиции
	set position (position = {}) {
		this.el.style.left = (position.x || 0) + 'px'
		this.el.style.top = (position.y || 0) + 'px'
	}

	// функция для показа попапа
	show () {
		this.el.style.display = ''
	}

	// функция для скрытия попапа
	hide () {
		this.el.style.display = 'none'
	}
}