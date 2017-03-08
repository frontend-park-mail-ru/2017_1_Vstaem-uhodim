describe('Тестирование logout/', function () {
  const http = new HTTP();

  it('Метод GET best/ возвращает статус 200', function (done) {
    http.get("best/")
      .then(resp => {
        expect(resp.status).toBe(200);

        done(true);
      })
  });
});
