describe('Тестирование logout/', function () {
  const http = new HTTP();

  it('Метод POST logout/ возвращает статус 200', function (done) {
    http.post("logout/")
      .then(resp => {
        expect(resp.status).toBe(200);

        done(true);
      })
      .catch((e) => {
        fail(e);
        done(false);
      });
  });
});
