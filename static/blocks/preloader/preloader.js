"use strict";
import template from "./preloader.pug";
import "./preloader.scss";
export default class Preloader {
	constructor() {
		if (Preloader.__instance) {
			return Preloader.__instance;
		}
		Preloader.__instance = this;

		this.el = document.createElement("div");
		this.el.id = "preloader";

		this.render();
		document.body.appendChild(this.el);
		this.animate();
	}

	animate() {
		let b = document.getElementsByClassName("palette__container");
		b = Array.prototype.slice.call(b);

		let el = document.getElementsByClassName("palette")[0];
		el.addEventListener("mouseover", function() {
			b.forEach(function(el) {
				let values;
				let value;

				values = window.getComputedStyle(el).getPropertyValue("transform");
				values = values.split('(')[1];
				values = values.split(')')[0];
				values = values.split(',');
				value = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));

				el.style.transform = "rotate(" + (value + 8).toString() + "deg)";
				el.style.animationPlayState = "paused";
			});
		});

		el.addEventListener("mouseout", function() {
			el.style.zoom = "1";
			b.forEach(function(el) {
				el.style.animationPlayState = "";
			})
		});

		let a = document.getElementsByClassName("palette__spot");
		a = Array.prototype.slice.call(a);
		a.forEach(function(el) {
			el.addEventListener("click", function() {
				document.body.style.background = LightenDarkenColor(getHexRGBColor(getComputedStyle(el).backgroundColor), +100);
			});
		})
	}
	stopAnimation() {
		document.body.style.background = "#f1f1f1";
	}

	render() {
		this.el.innerHTML = template();
		this.el.classList.add("preloader");

		return this;
	}
}


function LightenDarkenColor(col, amt) {

	var usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}
	var num = parseInt(col,16);
	var r = (num >> 16) + amt;
	if (r > 255) r = 255;
	else if  (r < 0) r = 0;
	var b = ((num >> 8) & 0x00FF) + amt;
	if (b > 255) b = 255;
	else if  (b < 0) b = 0;
	var g = (num & 0x0000FF) + amt;
	if (g > 255) g = 255;
	else if (g < 0) g = 0;
	return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

function getHexRGBColor(color)
{
	color = color.replace(/\s/g,"");
	var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
	if(aRGB)
	{
		color = '';
		for (var i=1;  i<=3; i++) color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,'0$1');
	}
	else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
	return "#" + color.toString();
}
