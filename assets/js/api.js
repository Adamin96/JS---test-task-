// создаю объект, чтобы удобнее было обращаться к апи
const API = {
	// определил адрес API
	API_BASE_URL: 'https://dummyjson.com/',
	
	// фнукция для получения продуктов
	async getItems (limit = 10) {
		// формирую параметры
		const params = new URLSearchParams({
			// делаю выборку только нужных полей
			select: 'id,title,price,rating,description',
			limit: limit
		})
		// выполняю запрос
		const raw = await fetch(this.API_BASE_URL + 'products?' + params)
		// обрабатываю ошибочный ответ сервера
		if (!raw.ok) {
			alert('при получении данных произошла ошибка')
			return (false)
		}
		// возвращаю продукты
		const resp = await raw.json()
		return (resp.products)
	}
}