import HTTP from "../modules/http.js";
import getRandomLogin from "./commonSpecs.js";

const [describe, it, beforeEach, expect, fail, jasmine] = [window.describe, window.it, window.beforeEach, window.expect, window.fail, window.jasmine];

const http = new HTTP();

describe('Тестирование login/', () => {

	beforeEach((done) => {
		http.post("logout/")
			.then(resp => {
				expect(resp.status).toBe(200);
				done(true);
			});
	}, 25000);


	it('Метод POST login/ возвращает статус 200', (done) => {

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

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);

	it('Метод POST login/ возвращает статус 400, код "insufficient", если не передан password', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		const short_form = {
			login: new_user.login
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("logout/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("login/", short_form);
			})
			.then(resp => {
				expect(resp.status).toBe(400);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "insufficient"
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);

	it('Метод POST login/ возвращает статус 400, код "insufficient", если не передан login', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		const short_form = {
			password: new_user.password
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("logout/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("login/", short_form);
			})
			.then(resp => {
				expect(resp.status).toBe(400);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "insufficient"
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);

	it('Метод POST login/ возвращает статус 403, код "log_out", если авторизованный пользователь пытается авторизоваться', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		const short_form = {
			login: new_user.login
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("login/", short_form);
			})
			.then(resp => {
				expect(resp.status).toBe(403);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "log_out"
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);


	it('Метод POST login/ возвращает статус 403, код "forbidden", если введены неверные аторизационные данные', (done) => {

		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		const short_form = {
			login: new_user.login,
			password: "djowejoidjweoi"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("logout/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("login/", short_form);
			})
			.then(resp => {
				expect(resp.status).toBe(403);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "forbidden"
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);
});
