/**
 * Created by kate on 16.02.17.
 */

window.addEventListener("load", fixTail);

function fixTail() {
  let tail = document.getElementById("tail");
  let main = document.getElementById("main");

  main.style.height = `${main.offsetWidth.toString()}px`;

  tail.style.borderWidth = `${(main.offsetWidth * 110 / 360)}px`;
  tail.style.borderBottomWidth = `${(main.offsetWidth * 60 / 360)}px`;
  tail.style.borderRightWidth = `${(main.offsetWidth * 60 / 360)}px`;
}

