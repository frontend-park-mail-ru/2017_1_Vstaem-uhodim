(function () {
  "use strict";
  const tmpl = image_croc_tmpl;
  class ImageCroc {
    constructor() {
      this.el = document.createElement("div");
      this.el.id = "main";
    }
    fixTail() {
      let tail = this.el.querySelector("#tail");
      let main = this.el;

      main.style.height = `${main.offsetWidth.toString()}px`;

      tail.style.borderWidth = `${(main.offsetWidth * 110 / 360)}px`;
      tail.style.borderBottomWidth = `${(main.offsetWidth * 60 / 360)}px`;
      tail.style.borderRightWidth = `${(main.offsetWidth * 60 / 360)}px`;
    }

    render() {
      this.el.innerHTML = tmpl();
      this.el.classList.add("croco-image");
      return this;
    }
  }

  window.ImageCroc = ImageCroc;
})();
