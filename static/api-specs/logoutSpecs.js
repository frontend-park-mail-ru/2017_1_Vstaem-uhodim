(function () {
  const describe = window.describe;
  const it = window.it;
  const getRandomLogin = window.getRandomLogin;
  const beforeEach = window.beforeEach;
  const HTTP = window.HTTP;
  const expect = window.expect;
  const fail = window.fail;

  const http = new HTTP();

  describe('Тестирование logout/', function () {

    beforeEach(function (done) {
      http.post("logout/")
        .then(resp => {
          expect(resp.status).toBe(200);
          done(true);
        });
    }, 25000);

    it('Метод POST logout/ возвращает статус 200, если пользователь не был авторизован', function (done) {
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

    it('Метод POST logout/ возвращает статус 200, если пользователь был авторизован', function (done) {
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
})();
