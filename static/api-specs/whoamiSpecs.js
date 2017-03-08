describe('Тестирование who-am-i/', function () {
  const http = new HTTP();

  beforeEach(function (done) {
    http.post("logout/")
      .then(resp => {
        expect(resp.status).toBe(200);
        done(true);
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
        return http.get("who-am-i/")
      })
      .then(resp => {
        expect(resp.status).toBe(200);

        done(true);
      })
  });

  it('Метод GET who-am-i/ возвращает статус 403, код "log_in" для неавторизованного пользователя', function (done) {

    http.get("who-am-i/")
      .then(resp => {
        expect(resp.status).toBe(403);
        return resp.json()
      })
      .then(error => {
        expect(error.code).toBe("log_in");

        done(true);
      })
  });

});
