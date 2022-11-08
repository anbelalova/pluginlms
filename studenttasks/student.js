import './styles/styles'
import { Rating } from '../rating/rating'
import { Quiz } from '../quiz/quiz'

const getTemplate = (surname, name, points) => {
	return `
	<div class="student-header">
		<h3 class="student-header__user" id="userStudent">${surname} ${name}</h3>
		<h3 class="student-header__points">Количество очков: ${points}</h3>
	</div>
	<div class="student-rating" data-type="rate">РЕЙТИНГ</div>
	<div class="student-tasks">
		<h4>Доступные квесты:</h4>
		<button data-type="task">Квиз</button>
		<button data-type="dragndrop">Строки кода</button>
	</div>
	`
}

export class StudentPage{
	constructor(selector,options){
		this.$el = document.querySelector(selector);
		this.options = options;
		this.res = this.options.res
		this.db = this.options.db
		console.log(this.db)

		this.$el.classList.remove('--hidden');
		this.#render();
		this.#setup();
	}

	#render(){
		this.$el.classList.add('student');
		this.$el.innerHTML = getTemplate(this.res.surname, this.res.name, this.res.points);
	}

	#setup(){
		this.clickHandler = this.clickHandler.bind(this);
		this.$el.addEventListener('click', this.clickHandler);
	}

	clickHandler(event){
		const {type} = event.target.dataset
		if(type==='rate'){
			const rating = new Rating('#rating', this.options)
			this.$el.classList.add('--hidden');
		} else if(type==='task'){
			let dataQuizlet = JSON.parse( localStorage.dataQuiz );
			const quiz = new Quiz('#quiz', {'data':dataQuizlet, 'db':this.options});
			this.$el.classList.add('--hidden');
		}
	}
}