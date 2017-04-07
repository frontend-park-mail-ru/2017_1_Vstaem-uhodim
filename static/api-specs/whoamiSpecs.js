import HTTP from "../modules/http.js";
import getRandomLogin from "./commonSpecs.js";

const [describe, it, beforeEach, expect, fail, jasmine] = [window.describe, window.it, window.beforeEach, window.expect, window.fail, window.jasmine];

const http = new HTTP();

describe('Тестирование who-am-i/', () => {

	beforeEach((done) => {
		http.post("logout/")
			.then(resp => {
				expect(resp.status).toBe(200);
				done(true);
			});
	}, 25000);

	it('Метод GET who-am-i/ возвращает статус 200 для вновь зарегистрированного пользователя', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.get("who-am-i/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return resp.json();
			})
			.then(resp => {
				expect(resp).toEqual(jasmine.objectContaining({
					login: new_user.login,
					email: new_user.email,
					rating: 0
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);

	it('Метод GET who-am-i/ возвращает статус 200 для авторизованного пользователя', (done) => {
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
				return http.get("who-am-i/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return resp.json();
			})
			.then(resp => {
				expect(resp).toEqual(jasmine.objectContaining({
					login: new_user.login,
					email: new_user.email,
					rating: 0
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);

	it('Метод GET who-am-i/ возвращает статус 403, код "log_in" для неавторизованного пользователя', (done) => {

		http.get("who-am-i/")
			.then(resp => {
				expect(resp.status).toBe(403);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "log_in"
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);

});
