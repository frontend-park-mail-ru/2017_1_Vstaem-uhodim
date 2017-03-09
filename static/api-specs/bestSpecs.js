(function () {
  const describe = window.describe;
  const it = window.it;
  const getRandomLogin = window.getRandomLogin;
  const HTTP = window.HTTP;
  const expect = window.expect;
  const fail = window.fail;

  const http = new HTTP();

  describe('Тестирование best/', function () {

    it('Метод GET best/ возвращает статус 200, массив пользователей', function (done) {
      let new_user = {
        login: getRandomLogin(),
        password: "123456",
        email: "123@mail.ru"
      };

      http.post("register/", new_user)
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
    }, 25000);
  });
})();
