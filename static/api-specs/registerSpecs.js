describe('Тестирование register/', function () {

  beforeEach(function (done) {
    http.post("logout/")
      .then(resp => {
        expect(resp.status).toBe(200);
        done(true);
      });
  }, 5000);

  it('Метод POST register/ возвращает статус 200, JSON с данными зарегистрированного пользователя', function (done) {
    let new_user = {
      login: getRandomLogin(),
      password: "123456",
      email: "123@mail.ru"
    };

    http.post("register/", new_user)
      .then(resp => {
        expect(resp.status).toBe(200);
        expect(resp.headers.get("content-type")).toBe("application/json;charset=utf-8");
        return resp.json();
      })
      .then(user => {
        expect(user.login).toBe(new_user.login);
        expect(user.email).toBe(new_user.email);
        expect(user.rating).toBe(0);

        done(true);
      })
      .catch((e) => {
        fail(e);
        done(false);
      });

  }, 5000);


  it('Метод POST register/ возвращает статус 400, код "insufficient", если не все поля переданы', function (done) {
    let new_user = {
      login: getRandomLogin(),
      password: "123456"
    };

    http.post("register/", new_user)
      .then(resp => {
        expect(resp.status).toBe(400);
        return resp.json();
      })
      .then(error => {
        expect(error.code).toBe("insufficient");

        done(true);
      });

  }, 5000);

  it('Метод POST register/ возвращает статус 400, код "invalid_field", если есть невалидные поля', function (done) {
    let new_user = {
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
        expect(error.code).toBe("invalid_field");

        done(true);
      })
      .catch((e) => {
        fail(e);
        done(false);
      });

  }, 5000);

  it('Метод POST /register возвращает статус 403, код "exists", если login занят', function (done) {
    let new_user = {
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
        expect(error.code).toBe("exists");

        done(true);
      })
      .catch((e) => {
        fail(e);
        done(false);
      });

  }, 5000);

  it('Метод POST register/ возвращает статус 403, код "log_out", если авторизованный пользователь пытается зарегистрироваться', function (done) {
    let new_user = {
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
        expect(error.code).toBe("log_out");

        done(true);
      })
      .catch((e) => {
        fail(e);
        done(false);
      });

  }, 5000);
});
