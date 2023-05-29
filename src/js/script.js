"use strict";

document.addEventListener('DOMContentLoaded', () =>{
  const menu = document.querySelector('.menu_top_header');
  const burger = document.querySelector('.burger');
  // const modal = document.querySelector('#order');
  // const submit = document.querySelectorAll('.submit');
  // const btn = document.querySelector('#123');

  // btn.addEventListener('click', (event)=>{
  //   event.preventDefault();
  //   console.log(111);
  // })
  
  // modal.style.visibility = 'visible';
  // submit.forEach((btn, i) => {
  //   btn.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     modal.style.visibility = 'visible';
  //     console.log(111);
  //   })
  // })
  console.log(burger);
  
 
  window.addEventListener('scroll', e => {
    if(window.scrollY >= 100) {
      menu.classList.add('sticky');
      burger.classList.add('white');
    }
    else {
      menu.classList.remove('sticky');
      burger.classList.remove('white');
    }
  });


  async function submitForm(event) {
    event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
    try {
      // Формируем запрос
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: new FormData(event.target)
      });
      // проверяем, что ответ есть
      if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
      // проверяем, что ответ действительно JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw ('Ошибка обработки. Ответ не JSON');
      }
      // обрабатываем запрос
      const json = await response.json();
      if (json.result === "success") {
        // в случае успеха
        alert(json.info);
      } else { 
        // в случае ошибки
        console.log(json);
        throw (json.info);
      }
    } catch (error) { // обработка ошибки
      alert(error);
    }
  }



  

});