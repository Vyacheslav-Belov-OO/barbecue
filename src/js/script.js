"use strict";

document.addEventListener('DOMContentLoaded', () =>{
  const menu = document.querySelector('.menu_top_header');
 
  window.addEventListener('scroll', e => {
    if(window.scrollY >= 100) {
      menu.classList.add('sticky');
    }
    else {
      menu.classList.remove('sticky');
    }
  });

});