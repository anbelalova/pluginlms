import './styles/styles'
import {Auth} from './auth/auth'

appPlug.classList.add('appPlug');
appPlug.innerHTML = `
<div class="wrap">
	<div id="auth"></div>
	<div id="student"></div>
	<div id="rating"></div>
	<div id="quiz"></div>
	<div id="dragndrop"></div>
</div>
`

let db;

init();

async function init() {
	db = await idb.openDb('plugDb', 1, db => {
		db.createObjectStore('auth', { keyPath: 'email' });
		db.createObjectStore('quiz', { keyPath: 'id' });
	});

	const auth = new Auth('#auth', db);
	// addQuiz(db)
}

async function addQuiz(db) {
	// let id = 2
	// let type = 'dragndrop'
	// let data = [
	// 			{
	// 				question: "Вопрос 1",
	// 				points: 5,
	// 				answers: [
	// 					{ id: '1', value: 'Ответ 1', correct: true,},
	// 					{ id: '2', value: 'Ответ 2', correct: false,},
	// 					{ id: '3', value: 'Ответ 3', correct: false,},
	// 				]
	// 			},
	// 			{
	// 				question: "Вопрос 2",
	// 				points: 3,
	// 				answers: [
	// 					{ id: '1', value: 'Ответ 4', correct: false,},
	// 					{ id: '2', value: 'Ответ 5', correct: true,},
	// 				]
	// 			},
	// 			{
	// 				question: "Вопрос 3",
	// 				points: 3,
	// 				answers: [
	// 					{ id: '1', value: 'Ответ 6', correct: false,},
	// 					{ id: '2', value: 'Ответ 7', correct: true,},
	// 				]
	// 			},
	// 		]
	let email = 'test3@edu.hse.ru'
	let password = '1234'
	let name = 'Мария'
	let surname = 'Хмелева'
	let points = 0
	let student = true
  
	let tx = db.transaction('auth', 'readwrite');
	// let tx = db.transaction('auth');
	let quizStore = tx.objectStore('auth');
  
	let task = await quizStore.getAll();
	// console.log(task)
  
	try {
	  await tx.objectStore('auth').add({email,password,name,surname,points,student});
	//   await list();
	} catch(err) {
	  if (err.name == 'ConstraintError') {
		alert("Такая книга уже существует");
		// await addBook();
	  } else {
		throw err;
	  }
	}
  }

window.addEventListener('unhandledrejection', event => {
	alert("Ошибка: " + event.reason.message);
});

// let obj1 = {
// 	data: [
// 		{
// 			question: "Вопрос5",
// 			points: 5,
// 			answers: [
// 				{ id: '1', value: 'Ответ 1', correct: true,},
// 				{ id: '2', value: 'Ответ 2', correct: false,},
// 				{ id: '3', value: 'Ответ 3', correct: false,},
// 			]
// 		},
// 		{
// 			question: "Вопрос 2",
// 			points: 3,
// 			answers: [
// 				{ id: '1', value: 'Ответ 4', correct: false,},
// 				{ id: '2', value: 'Ответ 5', correct: true,},
// 			]
// 		},
// 		{
// 			question: "Вопрос 3",
// 			points: 3,
// 			answers: [
// 				{ id: '1', value: 'Ответ 6', correct: false,},
// 				{ id: '2', value: 'Ответ 7', correct: true,},
// 			]
// 		},
// 	]
// };
// localStorage.dataQuiz1 = JSON.stringify(obj1);
// let dataQuizlet = JSON.parse( localStorage.dataQuiz );