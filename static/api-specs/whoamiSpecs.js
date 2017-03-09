(function () {

  const describe = window.describe;
  const it = window.it;
  const getRandomLogin = window.getRandomLogin;
  const HTTP = window.HTTP;
  const expect = window.expect;
  const fail = window.fail;
  const beforeEach = window.beforeEach;
  const jasmine = window.jasmine;

  const http = new HTTP();

  describe('Тестирование who-am-i/', function () {

    beforeEach(function (done) {
      http.post("logout/")
        .then(resp => {
          expect(resp.status).toBe(200);
          done(true);
        });
    }, 25000);

    it('Метод GET who-am-i/ возвращает статус 200 для вновь зарегистрированного пользователя', function (done) {
      let new_user = {
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

    it('Метод GET who-am-i/ возвращает статус 200 для авторизованного пользователя', function (done) {
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

    it('Метод GET who-am-i/ возвращает статус 403, код "log_in" для неавторизованного пользователя', function (done) {

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

})();
