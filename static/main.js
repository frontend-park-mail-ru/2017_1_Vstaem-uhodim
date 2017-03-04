/**
 * Created by kate on 04.03.17.
 */


(function () {
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
  let indexLeftPage = new Page({
    type: "left"
  });

  indexLeftPage.render();

  index.appendChild(indexLeftPage.el);

  let userArea = new UserArea({
    type: "authorized",
    nickname: "test123",
    score: "67"
  });

  userArea.render();

  indexLeftPage.el.appendChild(userArea.el);

  let indexRightPage = new Page({
    type: "right"
  });

  indexRightPage.render();

  index.appendChild(indexRightPage.el);

  indexRightPage.el.innerHTML += "<h1 class=\"page__title_main\">Крокодил</h1>";

  let menu = new Menu({
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
  let signupSinglePage = new Page({
    title: "Регистрация",
    type: "single",
    controls: [
      {
        text: "&#8630"
      }
    ]
  });

  signupSinglePage.render();
  signup.appendChild(signupSinglePage.el);

  let signupForm = new Form(
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
      }
    }
  );

  signupForm.render();

  signupSinglePage.el.appendChild(signupForm.el);


  <!-- -----------------------Login---------------------------- -->

  let loginSinglePage = new Page({
    title: "Авторизация",
    type: "single",
    controls: [
      {
        text: "&#8630"
      }
    ]
  });

  loginSinglePage.render();
  login.appendChild(loginSinglePage.el);


  let loginForm = new Form(
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
      }
    }
  );

  loginForm.render();

  loginSinglePage.el.appendChild(loginForm.el);


  <!-- -----------------------Leaderboard---------------------------- -->

  let leaderboardLeftPage = new Page({
    title: "Рисовали:",
    type: "left",
    controls: [
      {
        text: "&#8630"
      }
    ]
  });

  leaderboardLeftPage.render();

  leaderboard.appendChild(leaderboardLeftPage.el);

  let players = [
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

  let scoreTable = new ScoreTable(players);

  scoreTable.render();

  leaderboardLeftPage.el.appendChild(scoreTable.el);


  let leaderboardRightPage = new Page({
    title: "Рисовали:",
    type: "right"
  });

  leaderboardRightPage.render();

  leaderboard.appendChild(leaderboardRightPage.el);

  scoreTable = new ScoreTable(players);

  scoreTable.render();

  leaderboardRightPage.el.appendChild(scoreTable.el);




})();
