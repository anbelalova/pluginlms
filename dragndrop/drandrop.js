import './styles/styles.scss'
import { Rating } from '../rating/rating'

const getTemplate = () => {
	return `
	<section class="tasks">
	<h1 class="tasks__title">Расставьте строки кода в правильном порядке</h1>

	<ul class="tasks__list">
		<li class="tasks__item">ADVANCE (Normal(1,35,4))        ;</li>
		<li class="tasks__item">RELEASE F007 ; Освободить устройство</li>
		<li class="tasks__item">TERMINATE    ; удаление транзакта</li>
		<li class="tasks__item">GENERATE (POISSON(1,40))  ; генерация потока транзактов</li>
		<li class="tasks__item">DEPART mainQ ; Покинуть регистратор очереди</li>
		<li class="tasks__item">QUEUE mainQ ; Войти в регистратор очереди</li>
		<li class="tasks__item">SEIZE F007  ; Попытка занять устройство</li>
	</ul>
	<button class="btn-next" data-type="next">Завершить</button>
	</section>`
}

async function updateDb(user, db) {
	let email = user.email
	let password = user.password
	let name = user.name
	let surname = user.surname
	let points = user.points + 5
	let student = user.student
  
	let tx = db.transaction('auth', 'readwrite');
  
	try {
	  await tx.objectStore('auth').put({email,password,name,surname,points,student});
	} catch(err) {
	  if (err.name == 'ConstraintError') {
		alert("Уже существует");
	  } else {
		throw err;
	  }
	}
}

export class DragnDrop{
	constructor(selector,options){
		this.$el = document.querySelector(selector);
		this.options = options;
		this.user = options.res;
		this.db = options.db

		this.$el.classList.remove('--hidden');
		this.#render();
		this.#setup();
	}

	#render(){
		this.$el.classList.add('container');
		this.$el.innerHTML = getTemplate();
		this.task()
	}

	#setup(){
		this.clickHandler = this.clickHandler.bind(this);
		this.$el.addEventListener('click', this.clickHandler);
	}

	clickHandler(event){
		const {type} = event.target.dataset
		if (type === "next"){
			alert('Вы набрали 5 баллов!')
			updateDb(this.user, this.db);
			const rating = new Rating('#rating', this.options)
			this.$el.classList.add('--hidden');
		}
	}

	task(){
		const tasksListElement = document.querySelector(`.tasks__list`);
		const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);

		for (const task of taskElements) {
		task.draggable = true;
		}

		tasksListElement.addEventListener(`dragstart`, (evt) => {
			evt.target.classList.add(`selected`);
		});

		tasksListElement.addEventListener(`dragend`, (evt) => {
			evt.target.classList.remove(`selected`);
		});

		const getNextElement = (cursorPosition, currentElement) => {
		const currentElementCoord = currentElement.getBoundingClientRect();
		const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
	
		const nextElement = (cursorPosition < currentElementCenter) ?
		currentElement :
		currentElement.nextElementSibling;
	
		return nextElement;
		};

		tasksListElement.addEventListener(`dragover`, (evt) => {
			evt.preventDefault();
		
			const activeElement = tasksListElement.querySelector(`.selected`);
			const currentElement = evt.target;
			const isMoveable = activeElement !== currentElement &&
				currentElement.classList.contains(`tasks__item`);
			
			if (!isMoveable) {
				return;
			}
		
			const nextElement = getNextElement(evt.clientY, currentElement);
		
			if (
				nextElement && 
				activeElement === nextElement.previousElementSibling ||
				activeElement === nextElement
			) {
				return;
			}
				
			tasksListElement.insertBefore(activeElement, nextElement);
		});
	}
}