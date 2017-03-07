/**
 * Created by kate on 17.02.17.
 */

var canvas;
var page;
var context;
var isPainting;

window.onload = function () {
  canvas = document.getElementById("canvas");
  page = document.getElementsByClassName("page")[0];
  context = canvas.getContext("2d");
  isPainting = false;

  context.canvas.width = parseInt(getComputedStyle(page).width) - 6;
  context.canvas.height = parseInt(getComputedStyle(page).height) - 6;

  context.strokeStyle = "black";
  context.lineWidth = 5;

  canvas.onmousedown = startPainting;
  canvas.onmouseup = stopPainting;
  canvas.onmouseout = stopPainting;
  canvas.onmousemove = painting;
};

function startPainting(event) {
  isPainting = true;
  context.beginPath();
  context.moveTo(event.pageX - canvas.offsetLeft - parseInt(getComputedStyle(page).marginLeft), event.pageY - canvas.offsetTop - parseInt(getComputedStyle(page).marginTop));
}

function painting(event) {
  if (isPainting) {
    var x = event.pageX - canvas.offsetLeft - parseInt(getComputedStyle(page).marginLeft);
    var y = event.pageY - canvas.offsetTop - parseInt(getComputedStyle(page).marginTop);

    context.lineTo(x, y);
    context.stroke();
  }
}

function stopPainting() {
  isPainting = false;
}
