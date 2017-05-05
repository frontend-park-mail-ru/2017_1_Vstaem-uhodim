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
		let containers = document.getElementsByClassName("palette__container");
		containers = Array.prototype.slice.call(containers);

		containers.forEach((el) => {
			el.style.animationPlayState = "";
		});

		let palette = document.getElementsByClassName("palette");
		[palette] = [palette[0]];
		palette.addEventListener("mouseover", () => {
			containers.forEach((el) => {
				let values = window.getComputedStyle(el).getPropertyValue("transform");
				[values] = [values.split('(')[1]];
				[values] = [values.split(')')[0]];
				values = values.split(',');
				const value = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));

				el.style.transform = `rotate(${(value + 8)}"deg)`;
				el.style.animationPlayState = "paused";
			});
		});

		palette.addEventListener("mouseout", () => {
			containers.forEach((el) => {
				el.style.animationPlayState = "";
			})
		});


		this.spots = document.getElementsByClassName("palette__spot");
		this.spots = Array.prototype.slice.call(this.spots);
		this.spots.forEach(((el) => {
			el.addEventListener("click", (() => {
				this.el.style.background = lightenDarkenColor(getHexRGBColor(getComputedStyle(el).backgroundColor), +120);
			}).bind(this));
		}).bind(this))
	}
	stopAnimation() {
		this.el.style.background = "#f1f1f1";
		this.spots.forEach(((el) => {
			el.addEventListener("click", (() => {
				el.style.animationPlayState = "paused";
			}).bind(this));
		}).bind(this))
	}

	render() {
		this.el.innerHTML = template();
		this.el.classList.add("preloader");

		return this;
	}
}


function lightenDarkenColor(col, amt) {

	let usePound = false;
	if (col[0] === "#") {
		col = col.slice(1);
		usePound = true;
	}
	const num = parseInt(col,16);
	let r = (num >> 16) + amt;
	if (r > 255) r = 255;
	else if (r < 0) r = 0;
	let b = (num >> 8 & 0x00FF) + amt;
	if (b > 255) b = 255;
	else if (b < 0) b = 0;
	let g = (num & 0x0000FF) + amt;
	if (g > 255) g = 255;
	else if (g < 0) g = 0;
	return (usePound?"#":"") + (g | b << 8 | r << 16).toString(16);

}

function getHexRGBColor(color)
{
	color = color.replace(/\s/g,"");
	const aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
	if(aRGB)
	{
		color = '';
		for (let i=1; i<=3; i++) color += Math.round((aRGB[i][aRGB[i].length-1]==="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,'0$1');
	}
	else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
	return `#${color}`;
}
