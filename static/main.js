(function () {
  "use strict";
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


  <!-- -----------------------Index---------------------------- -->
  const indexLeftPage = new Page({
    type: "left"
  });

  indexLeftPage.render();

  index.appendChild(indexLeftPage.el);

  const userArea = new UserArea({
    type: "notAuthorized",
    nickname: "test123",
    score: "67"
  });

  userArea.render();

  indexLeftPage.el.appendChild(userArea.el);


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

  userArea.el.addEventListener("login", () => {
    index.hidden = true;
    login.hidden = false;
  });

  userArea.el.addEventListener("signup", () => {
    index.hidden = true;
    signup.hidden = false;
  });

  userArea.el.addEventListener("logout", () => {
    userArea.update({
      type: "notAuthorized"
    });
  });



  <!-- -----------------------Signup---------------------------- -->
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
          placeholder: "qwerty@mail.ru",
          type: "text",
          id: "js-signup-email"
        },
        {
          label: "Введите Nickname:",
          placeholder: "super_pizza",
          type: "text",
          id: "js-signup-nickname"
        },
        {
          label: "Пароль:",
          placeholder: "",
          type: "password",
          id: "js-signup-password"
        },
        {
          label: "Повторите пароль:",
          placeholder: "",
          type: "password",
          id: "js-signup-passwordrep"
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
    if (validateSignup()) {
      console.log("OK");
      signup.hidden = true;
      index.hidden = false;
      // /who-am-i
      userArea.update({
        type: "authorized",
        nickname: "какой-то новый",
        score: "67"
      });
    }
  });


  <!-- -----------------------Login---------------------------- -->

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
          type: "text",
          id: "js-login-nickname"
        },
        {
          label: "Пароль:",
          placeholder: "",
          type: "password",
          id: "js-login-password"
        }
      ],
      control: {
        text: "Авторизоваться!",
        id: "js-login-submit"
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
    if (validateLogin()) {
      console.log("OK");
      login.hidden = true;
      index.hidden = false;
      // /who-am-i
      userArea.update({
        type: "authorized",
        nickname: "test",
        score: "1267"
      });
    }
  });

  <!-- -----------------------Leaderboard---------------------------- -->

  const leaderboardLeftPage = new Page({
    title: "Рисовали:",
    type: "left",
    controls: [
      {
        text: "&#8630",
        event: "backtoindex"
      }
    ]
  });

  leaderboardLeftPage.render();

  leaderboard.appendChild(leaderboardLeftPage.el);

  const players = [
    {
      number: 1,
      nickname: "Kate",
      score: "1000"
    },
    {
      number: 2,
      nickname: "Kate",
      score: "999"
    },
    {
      number: 3,
      nickname: "Kate",
      score: "998"
    },
    {
      number: 4,
      nickname: "Kate",
      score: "997"
    },
    {
      number: 5,
      nickname: "Kate",
      score: "997"
    },
    {
      number: 6,
      nickname: "Kate",
      score: "997"
    },
    {
      number: 7,
      nickname: "Kate",
      score: "997"
    },
    {
      number: 8,
      nickname: "Kate",
      score: "997"
    },
    {
      number: 9,
      nickname: "Kate",
      score: "997"
    },
    {
      number: 10,
      nickname: "Kate",
      score: "997"
    },
  ];

  const firstScoreTable = new ScoreTable(players);

  firstScoreTable.render();

  leaderboardLeftPage.el.appendChild(firstScoreTable.el);


  const leaderboardRightPage = new Page({
    title: "Угадывали:",
    type: "right"
  });

  leaderboardRightPage.render();

  leaderboard.appendChild(leaderboardRightPage.el);

  const secondScoreTable = new ScoreTable(players);

  secondScoreTable.render();

  leaderboardRightPage.el.appendChild(secondScoreTable.el);

  leaderboardLeftPage.el.addEventListener("backtoindex", () =>
  {
    leaderboard.hidden = true;
    index.hidden = false;
  });


  <!-- -----------------------About---------------------------- -->


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
    console.log("123");
    about.hidden = true;
    index.hidden = false;
  });


  <!-- -----------------------Game---------------------------- -->

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
    console.log("123");
    game.hidden = true;
    index.hidden = false;
  });


})();
