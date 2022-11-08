import './styles/styles.scss'
import { Rating } from '../rating/rating'

const getTemplate = () => {
	return `
		<div class="quiz-header"><h3>Квиз</h3></div>
		<div class="quiz-question"></div>
		<div class="quiz-indicator"></div>
		<div class="quiz-results"></div>
		<div class="quiz-controls">
			<button class="btn-next" data-type="next" disabled>Далее</button>
			<button class='btn-rating-back --hidden' data-type="back">Рейтинг</button>
		</div>
	`
}

// async function ratelist(db) {
// 	let tx = db.transaction('auth');
// 	let userStore = tx.objectStore('auth');
// 	let users = await userStore.getAll();
  
// 	users.sort(function(a, b){
// 		return b.points-a.points
// 	})
// 	if (users.length) {
// 	  listElem.innerHTML = users.map(user => `<li class="rating-rating__item">${user.surname} ${user.name}<span>${user.points}</span></li>`).join('');
// 	} else {
// 	  listElem.innerHTML = '<li>Ошибка Рейтинга</li>'
// 	}
// }

export class Quiz{
	constructor(selector,options){
		this.$el = document.querySelector(selector);
		this.options = options.data;
		this.db = options.db;

		this.result_points = 0;
		this.input_id = 0;

		this.$el.classList.remove('--hidden');
		this.#render();
		this.#setup();
	}

	#render(){
		this.$el.classList.add('quiz');
		this.$el.innerHTML = getTemplate();
		this.renderQuestion(0);
	}

	#setup(){
		this.clickHandler = this.clickHandler.bind(this);
		this.$el.addEventListener('click', this.clickHandler);
		this.changeHandler = this.changeHandler.bind(this);
		this.$el.addEventListener('input', this.changeHandler);
	}

	renderQuestion(index){
		this.$el.querySelector('.quiz-question').dataset.currentStep = index;

		const renderAnswers = () =>  this.options.data[index].answers.
		map((answer) => `
			<li >
				<label>
					<input class='answer-input' data-type="answer-change" type="radio" data-id=${answer.id} name=${index} value = ${answer.id}>
					${answer.value}
				</label>
			</li>
		`)
		.join('');
		
		this.$el.querySelector('.quiz-question').innerHTML = `
			<div class="quiz-question__question">${this.options.data[index].question}</div>
			<ul class="quiz-question__answers">${renderAnswers()}</ul>
		`
	}

	changeHandler(event){
		const {type, id} = event.target.dataset

		if (type === "answer-change") {
			this.$el.querySelector('.btn-next').disabled = false;
			this.input_id = Number(id) - 1;
		}
	}

	clickHandler(event){
		const {type} = event.target.dataset

		if (type === "next") {
			const nextQuestionIndex = Number(this.$el.querySelector('.quiz-question').dataset.currentStep) + 1;
			
			if (this.options.data.length === nextQuestionIndex){
				this.$el.querySelector('.quiz-question').classList.add('--hidden');
				this.$el.querySelector('.btn-next').classList.add('--hidden');
				console.log(this.$el.querySelector('.btn-next'))
				this.resultScore(nextQuestionIndex - 1, this.input_id)
				this.renderResults();
			 } else {
				this.resultScore(nextQuestionIndex - 1, this.input_id)
				this.renderQuestion(nextQuestionIndex);
			}
			this.$el.querySelector('.btn-next').disabled = true;
		} else if(type === "back"){
			const rating = new Rating('#rating', this.db)
			this.$el.classList.add('--hidden');
		}
	}

	resultScore(index_question, index_answer){
		if (this.options.data[index_question].answers[index_answer].correct){
			this.result_points += this.options.data[index_question].points;
		}
	}

	renderResults(){
		this.$el.querySelector('.quiz-results').innerHTML =`Вы набрали ${this.result_points} очков!`
		this.$el.querySelector('.btn-rating-back').classList.remove('--hidden');
		this.$el.querySelector('.btn-next').classList.add('--hidden');
	}
};