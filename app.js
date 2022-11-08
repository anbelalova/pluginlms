// import './auth/styles/styles'
import './styles/styles'
// import './quiz/styles/styles'
import {Quiz} from './quiz/quiz'
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

// const auth = new Auth('#auth', '');

let db;

init();

async function init() {
	db = await idb.openDb('plugDb', 1, db => {
		db.createObjectStore('auth', { keyPath: 'email' });
		db.createObjectStore('quiz', { keyPath: 'id' });
	});

	// console.log()
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
	let email = 'test1@mail.ru'
	let password = '1234'
	let name = 'Андрей'
	let surname = 'Андреев'
	let points = 2
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
// // async function list() {
// 	let tx = db.transaction('auth');
// 	let authStore = tx.objectStore('auth');


// 	let users = await authStore.getAll();

// 	if (users.length) {
// 		listElem.innerHTML = users.map(user => `<li>
//         Студент: ${user.surname} ${user.name}
//       </li>`).join('');
// 	} else {
// 		listElem.innerHTML = '<li>Нет студентов</li>'
// 	}
// }



window.addEventListener('unhandledrejection', event => {
	alert("Ошибка: " + event.reason.message);
});





// let openRequest = indexedDB.open('plugin', 1);

// openRequest.onupgradeneeded = function() {
// 	let db = openRequest.result;
// 	if (!db.objectStoreNames.contains('auth')) { // если хранилище "books" не существует
// 	  db.createObjectStore('auth', {keyPath: 'id'});
// 	}
// };

// openRequest.onerror = function() {
// 	console.error("Error", openRequest.error);
// };
  
// openRequest.onsuccess = function() {
// 	let db = openRequest.result;
  
// 	db.onversionchange = function() {
// 	  db.close();
// 	  alert("База данных устарела, пожалуйста, перезагрузите страницу.")
// 	};
  
// 	// ...база данных готова, используйте ее...
// 	let transaction = db.transaction("auth", "readwrite"); // (1)

// 	// получить хранилище объектов для работы с ним
// 	let users = transaction.objectStore("auth");

// 	let user = {
// 		id: 3,
// 		firstname: "Olga",
// 		lastname:"M"
// 	  };
	  
// 	  let request = users.add(user);
// 	  request.onsuccess = function() { // (4)
// 		console.log("Ok", request.result);
// 	  };
	  
// 	  request.onerror = function() {
// 		console.log("No ok", request.error);
// 	  };
// };
  
// openRequest.onblocked = function() {
// 	// это событие не должно срабатывать, если мы правильно обрабатываем onversionchange
  
// 	// это означает, что есть ещё одно открытое соединение с той же базой данных
// 	// и он не был закрыт после того, как для него сработал db.onversionchange
// };





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

// const quiz = new Quiz('#quiz', dataQuizlet);