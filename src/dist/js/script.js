"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var menu = document.querySelector('.menu_top_header');
  window.addEventListener('scroll', function (e) {
    if (window.scrollY >= 100) {
      menu.classList.add('sticky');
    } else {
      menu.classList.remove('sticky');
    }
  });
});