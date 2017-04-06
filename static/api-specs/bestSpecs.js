import HTTP from "../modules/http.js";
import getRandomLogin from "./commonSpecs.js";

const [describe, it, beforeEach, expect, fail] = [window.describe, window.it, window.beforeEach, window.expect, window.fail];

const http = new HTTP();

describe('Тестирование best/', () => {

	beforeEach((done) => {
		http.post("logout/")
			.then(resp => {
				expect(resp.status).toBe(200);
				done(true);
			});
	}, 25000);

	it('Метод GET best/ возвращает статус 200, массив пользователей', (done) => {
		const newUser = {
			login: getRandomLogin(),
			password: "123456",
			email: "123@mail.ru"
		};

		http.post("register/", newUser)
			.then(resp => {
				expect(resp.status).toBe(200);
				return http.get("best/");
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				return resp.json();
			})
			.then(resp => {
				expect(resp instanceof Array).toBe(true);
				expect(resp.length > 0).toBe(true);
				expect(Object.keys(resp[0])).toEqual([
					"login",
					"email",
					"rating"
				]);
				done(true);
			})
			.catch((e) => {
				fail(e);
				done(false);
			});
	}, 5000);
});
