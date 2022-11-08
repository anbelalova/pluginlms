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


window.addEventListener('unhandledrejection', event => {
	alert("Ошибка: " + event.reason.message);
});

