import HTTP from "../modules/http.js";
import getRandomLogin from "./commonSpecs.js";

const [describe, it, beforeEach, expect, fail, jasmine] = [window.describe, window.it, window.beforeEach, window.expect, window.fail, window.jasmine];

const http = new HTTP();

describe('Тестирование register/', () => {

	beforeEach((done) => {
		http.post("logout/")
			.then(resp => {
				expect(resp.status).toBe(200);
				done(true);
			});
	}, 25000);

	it('Метод POST register/ возвращает статус 200, JSON с данными зарегистрированного пользователя', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return resp.json();
			})
			.then(user => {
				expect(user).toEqual(jasmine.objectContaining({
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


	it('Метод POST register/ возвращает статус 400, код "insufficient", если не передан email', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(400);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "insufficient"
				}));

				done(true);
			});

	}, 5000);

	it('Метод POST register/ возвращает статус 400, код "insufficient", если не передан password', (done) => {
		const new_user = {
			login: getRandomLogin(),
			email: "asd@mail.ru"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(400);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "insufficient"
				}));

				done(true);
			});

	}, 5000);

	it('Метод POST register/ возвращает статус 400, код "insufficient", если не передан login', (done) => {
		const new_user = {
			password: "123456",
			email: "asd@mail.ru"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(400);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "insufficient"
				}));

				done(true);
			});

	}, 5000);

	it('Метод POST register/ возвращает статус 400, код "invalid_field", если есть невалиден email', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(400);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "invalid_field"
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});

	}, 5000);

	it('Метод POST register/ возвращает статус 400, код "invalid_field", если есть невалиден password', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123",
			email: "123@mail.ru"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(400);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "invalid_field"
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});

	}, 5000);

	it('Метод POST /register возвращает статус 403, код "exists", если login занят', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("logout/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("register/", new_user);
			})
			.then(resp => {
				expect(resp.status).toBe(403);
				return resp.json();
			})
			.then(error => {
				expect(error).toEqual(jasmine.objectContaining({
					code: "exists"
				}));

				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});

	}, 5000);

	it('Метод POST register/ возвращает статус 403, код "log_out", если авторизованный пользователь пытается зарегистрироваться', (done) => {
		const new_user = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		http.post("register/", new_user)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.post("register/", new_user);
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
});
