import HTTP from "../modules/http.js";
import getRandomLogin from "./commonSpecs.js";

const [describe, it, beforeEach, expect, fail] = [window.describe, window.it, window.beforeEach, window.expect, window.fail];

const http = new HTTP();

describe('Тестирование logout/', () => {

	beforeEach((done) => {
		http.post("logout/")
			.then(resp => {
				expect(resp.status).toBe(200);
				done(true);
			});
	}, 25000);

	it('Метод POST logout/ возвращает статус 200, если пользователь не был авторизован', (done) => {
		http.post("logout/")
			.then(resp => {
				expect(resp.status).toBe(200);

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);

	it('Метод POST logout/ возвращает статус 200, если пользователь был авторизован', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		const shortForm = {
			login: new_user.login,
			password: new_user.password
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("logout/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("login/", shortForm);
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("logout/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);
});
