(function () {
  "use strict";

  const http = new HTTP();

  const index = document.getElementById("js-index");
  const signup = document.getElementById("js-signup");
  const login = document.getElementById("js-login");
  const leaderboard = document.getElementById("js-leaderboard");
  const game = document.getElementById("js-game");
  const about = document.getElementById("js-about");


  signup.hidden = true;
  login.hidden = true;
  leaderboard.hidden = true;
  game.hidden = true;
  about.hidden = true;


  /*-----------------------Index----------------------------*/
  const indexLeftPage = new Page({
    type: "left"
  });

  indexLeftPage.render();

  index.appendChild(indexLeftPage.el);

  let userArea = null;

  http.get("who-am-i/")
    .then(resp => {
      if (resp.status === 200) {
        return resp.json();
      }
      else {
        throw Error("log out");
      }
    })
    .then(user=> {
        userArea = new UserArea({
          type: "authorized",
          nickname: user.login,
          score: "124"
        });
    },
    error => {
      userArea = new UserArea({
        type: "notAuthorized",
        nickname: "test123",
        score: "67"
      });

    })
    .then(() => {
      userArea.render();

      if(document.querySelector("#main")) {
        indexLeftPage.el.insertBefore(userArea.el, document.querySelector("#main"));
      }
      else {
        indexLeftPage.el.appendChild(userArea.el);
      }

      userArea.el.addEventListener("login", () => {
        index.hidden = true;
        login.hidden = false;
      });

      userArea.el.addEventListener("signup", () => {
        index.hidden = true;
        signup.hidden = false;
      });

      userArea.el.addEventListener("logout", () => {
        http.post("logout/")
          .then(resp => {
            userArea.update({
              type: "notAuthorized"
            });
          });
      });
    });

  const image = new ImageCroc();
  image.render();

  indexLeftPage.el.appendChild(image.el);
  image.fixTail();

  const indexRightPage = new Page({
    type: "right"
  });

  indexRightPage.render();

  index.appendChild(indexRightPage.el);

  indexRightPage.el.innerHTML += "<h1 class=\"page__title_main\">Крокодил</h1>";

  const menu = new Menu({
    controls: [
      {
        text: "Играть!",
        action: true,
        id: "js-index-game",
        event: "choosePlay"
      },
      {
        text: "Рейтинг",
        action: false,
        id: "js-index-leaderboard",
        event: "chooseScore"
      },
      {
        text: "Об игре",
        action: false,
        id: "js-index-about",
        event: "chooseAbout"
      },
    ]
  });

  menu.render();

  indexRightPage.el.appendChild(menu.el);

  menu.el.addEventListener("choosePlay", function () {
    index.hidden = true;
    game.hidden = false;
  });

  menu.el.addEventListener("chooseScore", function () {
    index.hidden = true;
    leaderboard.hidden = false;
  });

  menu.el.addEventListener("chooseAbout", function () {
    index.hidden = true;
    about.hidden = false;
  });


  /*-----------------------Signup----------------------------*/
  const signupSinglePage = new Page({
    title: "Регистрация",
    type: "single",
    controls: [
      {
        text: "&#8630",
        event: "backtoindex"
      }
    ]
  });

  signupSinglePage.render();
  signup.appendChild(signupSinglePage.el);

  const signupForm = new Form(
    {
      fields: [
        {
          label: "Введите Email:",
          attributes: {
            placeholder: "qwerty@mail.ru",
            type: "text",
            id: "js-signup-email",
            type_attr: "email"
          }
        },
        {
          label: "Введите Nickname:",
          attributes: {
            placeholder: "super_pizza",
            type: "text",
            id: "js-signup-nickname",
            type_attr: "login"
          }
        },
        {
          label: "Пароль:",
          attributes: {
            placeholder: "",
            type: "password",
            id: "js-signup-password",
            type_attr: "password"
          }
        },
        {
          label: "Повторите пароль:",
          attributes: {
            placeholder: "",
            type: "password",
            id: "js-signup-passwordrep",
            type_attr: "passwordrep"
          }
        }
      ],
      control: {
        text: "Зарегистрироваться!",
        id: "js-signup-submit"
      }
    }
  );

  signupForm.render();

  signupSinglePage.el.appendChild(signupForm.el);

  signupSinglePage.el.addEventListener("backtoindex", () =>
  {
    signup.hidden = true;
    index.hidden = false;
  });

  signupForm.el.addEventListener("submit", (event) => {
    event.preventDefault();
    if (signupForm.isValid()) {
      http.post("register/", signupForm.getValues())
        .then(resp => {
          switch (resp.status) {
            case 200:
              return resp.json();
            case 403:
              signupForm.showErrorByType("login", "Nickname уже занят");
              throw Error();
          }
        })
        .then(new_user => {
          signup.hidden = true;
          index.hidden = false;
          userArea.update({
            type: "authorized",
            nickname: new_user.login,
            score: "67"
          });
        })
        .catch( res => {
        });
    }
  });

  /*-----------------------Login----------------------------*/

  const loginSinglePage = new Page({
    title: "Авторизация",
    type: "single",
    controls: [
      {
        text: "&#8630",
        event: "backtoindex"
      }
    ]
  });

  loginSinglePage.render();
  login.appendChild(loginSinglePage.el);


  const loginForm = new Form(
    {
      fields: [
        {
          label: "Nickname:",
          attributes: {
            type: "text",
            id: "js-login-nickname",
            type_attr: "login"
          }
        },
        {
          label: "Пароль:",
          attributes: {
            placeholder: "",
            type: "password",
            id: "js-login-password",
            type_attr: "password"
          }
        }
      ],
      control: {
        text: "Авторизоваться!",
        type_attr: "js-login-submit"
      }
    }
  );

  loginForm.render();

  loginSinglePage.el.appendChild(loginForm.el);

  loginSinglePage.el.addEventListener("backtoindex", () =>
  {
    login.hidden = true;
    index.hidden = false;
  });

  loginForm.el.addEventListener("submit", (event) => {
    event.preventDefault();
    if (loginForm.isValid()) {
      http.post("login/", loginForm.getValues())
        .then(resp => {
          switch (resp.status) {
            case 200:
              login.hidden = true;
              index.hidden = false;
              userArea.update({
                type: "authorized",
                nickname: loginNickname.value,
                score: "67"
              });
              break;
            case 403:
              loginForm.showErrorByType("login", "");
              loginForm.showErrorByType("password", "Неправильно!");
              break;
          }
        });
    }
  });

  /*-----------------------Leaderboard----------------------------*/

  const leaderboardSinglePage = new Page({
    title: "Лучшие:",
    type: "single",
    controls: [
      {
        text: "&#8630",
        event: "backtoindex"
      }
    ]
  });

  leaderboardSinglePage.render();

  leaderboard.appendChild(leaderboardSinglePage.el);

  let firstScoreTable;

  http.get('best/')
    .then(resp => {
      if (resp.status === 200) {
        return resp.json();
      }
    })
    .then(players => {
      players.forEach((player, number) => {
        player.number = number + 1;
      });
      firstScoreTable = new ScoreTable(players);
      firstScoreTable.render();
      leaderboardSinglePage.el.appendChild(firstScoreTable.el);
    });



  leaderboardSinglePage.el.addEventListener("backtoindex", () =>
  {
    leaderboard.hidden = true;
    index.hidden = false;
  });


  /*-----------------------About----------------------------*/

  const aboutLeftPage = new Page({
    title: "Крокодил:",
    type: "left",
    controls: [
      {
        text: "&#8630",
        event: "backtoindex"
      }
    ]
  });

  aboutLeftPage.render();

  about.appendChild(aboutLeftPage.el);

  const aboutGame = new TextParagraph({
    text: "Смысл игры состоит в том, чтобы отгадать загаданное слово. Один игрок рисует " +
    "слово на страничке, остальные угадывают ответ в чате."
  });

  aboutGame.render();

  aboutLeftPage.el.appendChild(aboutGame.el);



  //aboutLeftPage.el.innerHTML += "<div class=\"some-picture\">Это картинка будет </div>";

  const aboutRightPage = new Page({
    title: "Список:",
    type: "right"
  });

  aboutRightPage.render();

  about.appendChild(aboutRightPage.el);

  const firstPar = new TextParagraph({
    title: "Человек 1",
    text: "Some text some text some text some text some text"
  });

  firstPar.render();

  aboutRightPage.el.appendChild(firstPar.el);

  const secPar = new TextParagraph({
    title: "Человек 2",
    text: "Some text some text some text some text some text"
  });

  secPar.render();

  aboutRightPage.el.appendChild(secPar.el);

  const otherPar = new TextParagraph({
    title: "...",
    text: "Some text some text some text some text some text"
  });

  otherPar.render();

  aboutRightPage.el.appendChild(otherPar.el);


  aboutLeftPage.el.addEventListener("backtoindex", () =>
  {
    about.hidden = true;
    index.hidden = false;
  });


  /*-----------------------Game----------------------------*/

  const gameSinglePage = new Page({
    type: "game",
    controls: [
      {
        text: "&#8630",
        event: "backtoindex"
      }
    ]
  });

  gameSinglePage.render();

  game.appendChild(gameSinglePage.el);

  gameSinglePage.el.addEventListener("backtoindex", () =>
  {
    game.hidden = true;
    index.hidden = false;
  });


})();
