const getComputedStyle= window.getComputedStyle;
const canvas = window.canvas;


var currentColor;

function setPaletteColor(element, color) {
  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 0 4px ${color}`;
  element.addEventListener("click", changeColor);
}

var colors = document.getElementsByClassName("palette__color");

setPaletteColor(colors[0], "red");
currentColor = colors[0];

setPaletteColor(colors[1], "blue");
setPaletteColor(colors[2], "green");
setPaletteColor(colors[3], "yellow");
setPaletteColor(colors[4], "pink");
setPaletteColor(colors[5], "indigo");
setPaletteColor(colors[6], "orange");

function changeColor(event) {
  const context = canvas.getContext("2d");
  context.strokeStyle = getComputedStyle(event.currentTarget).backgroundColor;
}
