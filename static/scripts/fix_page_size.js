/**
 * Created by kate on 17.02.17.
 */
"use_strict";

window.addEventListener("resize", fixPageSize);
window.addEventListener("load", fixPageSize);

function fixPageSize() {
  let leftPage = document.getElementById("side-left");
  let rightPage = document.getElementById("side-right");
  let imageCroc = document.getElementById("main");
  let background = document.getElementsByClassName("background")[0];

  if (window.innerWidth < 1000) {
    background.style.height = "auto";
    background.style.position = "absolute";

    leftPage.className = "page single-page";
    leftPage.style.height = "auto";

    rightPage.className = "page single-page";
    rightPage.style.height = "auto";

    if (imageCroc != null) imageCroc.style.display = "none";
  }
  else {
    leftPage.className = "page page-left";
    leftPage.style.height = "95%";

    rightPage.className = "page page-right";
    rightPage.style.height = "95%";

    if (imageCroc != null) imageCroc.style.display = "block";

    background.style.height = "100%";
    background.style.position = "fixed";
  }

  let singlePages = Array.prototype.slice.call(document.getElementsByClassName("single-page"));
  let width;

  if (window.innerWidth < 900) width = "80%";
  else width = "";

  for (let i in singlePages) singlePages[i].style.width = width;
}


