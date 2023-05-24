"use strict";

document.addEventListener('DOMContentLoaded', () =>{
  const menu = document.querySelector('.menu_top_header');
  const modal = document.querySelector('#order');
  const submitButtom =document.querySelectorAll('.submit_button');
  const popupCloseIcon = document.querySelector('.popup__close');
  const popupOverlay= document.querySelector('.popup__overlay');

  // Open modal

  

  submitButtom.forEach((btn, i)=> {
    btn.addEventListener('click', () => {
      modal.classList.add('popup_show');
      modal.style.visibility = 'visible';
      console.log(1);
    })
  })

  //Close Modal
  popupCloseIcon.addEventListener('click', () => {
    modal.classList.remove('popup_show');
    modal.style.visibility = 'hidden';
  })

  popupOverlay.addEventListener('click', () => {
    modal.classList.remove('popup_show');
    modal.style.visibility = 'hidden';
  })

  // const modal = document.querySelector('#order');
  // const submit = document.querySelectorAll('.submit');
  // const btn = document.querySelector('#123');

  // btn.addEventListener('click', (event)=>{
  //   event.preventDefault();
  //   console.log(111);
  // })
  
  // modal.style.visibility = 'visible';
  // submit.forEach(c => {
  //   btn.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     modal.style.visibility = 'visible';
  //     console.log(111);
  //   })
  // })
  
 
  window.addEventListener('scroll', e => {
    if(window.scrollY >= 100) {
      menu.classList.add('sticky');
    }
    else {
      menu.classList.remove('sticky');
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