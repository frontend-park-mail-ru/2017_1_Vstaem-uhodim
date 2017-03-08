describe('Тестирование login/', function () {
  const http = new HTTP();

  beforeEach(function (done) {
    http.post("logout/")
      .then(resp => {
        expect(resp.status).toBe(200);
        done(true);
      });
  }, 5000);


  it('Метод POST login/ возвращает статус 200', function (done) {

    let new_user = {
      login: getRandomLogin(),
      password: "123456",
      email: "123@mail.ru"
    };

    let shortForm = {
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
  });

  it('Метод POST login/ возвращает статус 400, код "insufficient", если не все поля переданы', function (done) {
    let new_user = {
      login: getRandomLogin(),
      password: "123456",
      email: "123@mail.ru"
    };

    let short_form = {
      login: new_user.login
    };

    console.log(new_user.login);

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
        return resp.json()
      })
      .then(error => {
        expect(error.code).toBe("insufficient");

        done(true);
      })
      .catch((e) => {
        fail(e);
        done(false);
      });
  });

  it('Метод POST login/ возвращает статус 403, код "log_out", если авторизованный пользователь пытается авторизоваться', function (done) {
    let new_user = {
      login: getRandomLogin(),
      password: "123456",
      email: "123@mail.ru"
    };

    let short_form = {
      login: new_user.login
    };

    console.log(new_user.login);

    http.post("register/", new_user)
      .then(resp => {
        expect(resp.status).toBe(200);
        return http.post("login/", short_form);
      })
      .then(resp => {
        expect(resp.status).toBe(403);
        return resp.json()
      })
      .then(error => {
        expect(error.code).toBe("log_out");

        done(true);
      })
      .catch((e) => {
        fail(e);
        done(false);
      });
  });


  it('Метод POST login/ возвращает статус 403, код "forbidden", если введены неверные аторизационные данные', function (done) {

    let new_user = {
      login: getRandomLogin(),
      password: "123456",
      email: "123@mail.ru"
    };

    let short_form = {
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
        return resp.json()
      })
      .then(error => {
        expect(error.code).toBe("forbidden");

        done(true);
      })
      .catch((e) => {
        fail(e);
        done(false);
      });
  });

});
