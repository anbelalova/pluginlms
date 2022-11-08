import './styles/styles'
import { StudentPage } from '../studenttasks/student'

const getTemplate = (surname, name, points) => {
	return `
	<div class ="rating-header">
		<h4 class="rating-header__user">${surname} ${name}</h4>
		<h4 class="rating-header__points">Количество очков: ${points}</h4>
		
	</div>
	<h3 class="rating-header__h">Общий рейтинг</h3>
	<div class="rating-rating">
		<ol class="rating-rating__list" id="listElem"></ol>
	</div>
	<button class='rating-back' data-type="back">Назад</button>
	`
}

async function ratelist(db) {
	let tx = db.transaction('auth');
	let userStore = tx.objectStore('auth');
  
	let users = await userStore.getAll();
  
	users.sort(function(a, b){
		return b.points-a.points
	})
	if (users.length) {
	  listElem.innerHTML = users.map(user => `<li class="rating-rating__item">${user.surname} ${user.name}<span>${user.points}</span></li>`).join('');
	} else {
	  listElem.innerHTML = '<li>Ошибка Рейтинга</li>'
	}
}

export class Rating{
	constructor(selector,options){
		this.$el = document.querySelector(selector);
		this.options = options;
		this.res = this.options.res
		this.db = this.options.db

		this.$el.classList.remove('--hidden');
		this.#render();
		ratelist(this.db);
		this.#setup();
	}

	#render(){
		this.$el.classList.add('rating');
		this.$el.innerHTML = getTemplate(this.res.surname, this.res.name, this.res.points);
	}

	#setup(){
		this.clickHandler = this.clickHandler.bind(this);
		this.$el.addEventListener('click', this.clickHandler);
	}

	clickHandler(event){
		const {type} = event.target.dataset
		if(type==='back'){
			const studentpage = new StudentPage('#student', this.options)
			this.$el.classList.add('--hidden');
		}
	}
}