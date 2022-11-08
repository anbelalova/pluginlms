import './styles/styles.scss'
import { StudentPage } from '../studenttasks/student'

const getTemplate = () => {
	return `
	<div class="reg-form">
		<h3 class="text-center">Авторизация</h3>
		<div class="form-group">
			<input class="form-control item" type="email" name="email" id="email" placeholder="Email"
				required>
		</div>
		<div class="form-group">
			<input class="form-control item" type="password" name="password" id="password"
				placeholder="Пароль" required>
		</div>
		<div class="form-group">
			<button class="btn create-account" data-type="vhod">Войти</button>
		</div>
	</div>
	`
}

async function authUser(db) {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	let tx = db.transaction('auth', 'readonly');
	let userStore = tx.objectStore('auth');
	
	let users = await userStore.getAll();
	
	if (users.length) {
		users.forEach((user) => {
			if(user.email===email){
				if(user.password === password){
					if(user.student === true){
						let uret = email;
					}
				} else {
					alert('Неверный пароль!');
					return
				}
			}
		})
	}
	return await userStore.get(email)
}

export class Auth{
	constructor(selector,options){
		this.$el = document.querySelector(selector);
		this.options = options;

		this.#render();
		this.#setup();
	}

	#render(){
		this.$el.classList.add('reg');
		this.$el.innerHTML = getTemplate();
	}

	#setup(){
		this.clickHandler = this.clickHandler.bind(this);
		this.$el.addEventListener('click', this.clickHandler);
	}

	clickHandler(event){
		const {type} = event.target.dataset
		if(type === "vhod"){
			let student = authUser(this.options);
			if(student){
				student.then(result => {
					const studentpage = new StudentPage('#student', {'res':result, 'db':this.options})
				})
				this.$el.classList.add('--hidden');
			}
		}
	}
}


// import {init} from '../app'

// async function clearUsers() {
// 	let tx = db.transaction('auth', 'readwrite');
// 	await tx.objectStore('auth').clear();
// 	await list();
// }

// export async function addUser(db) {
// 	let id = 4;
// 	let email = "test@mail.ru";
// 	let password = '1234';
//     let name = 'Ольга';
// 	let surname = "Мил";
// 	let points = 0;
// 	let student = true;

// 	let tx = db.transaction('auth', 'readwrite');

// 	try {
// 		await tx.objectStore('auth').add({ id, email, password, name, surname, points, student});
// 		// await list();
// 	} catch (err) {
// 		if (err.name == 'ConstraintError') {
// 			alert("Такая книга уже существует");
// 			// await addUser();
// 		} else {
// 			throw err;
// 		}
// 	}
// }

// export async function authUser(db){
// 	let email = document.getElementById("email").value;
// 	let tx = db.transaction('auth', 'readonly');
// 	let userStore = tx.objectStore('auth');
// 	let users = await userStore.getAll();

//   if (users.length) {
//     users.forEach(function callback(user){
// 		if(user.email===email){
// 		userStudent.innerHTML = `${user.surname} ${user.name}`}})
//   } else {
//     userStudent.innerHTML = 'NOOOO'
//   }
// }