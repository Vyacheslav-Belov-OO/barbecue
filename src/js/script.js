"use strict";

document.addEventListener('DOMContentLoaded', () =>{
  // Добавляем обработчик на отправку формы
  const orderForm = document.querySelector('#orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Блокируем стандартную отправку
      submitForm(e); // Вызываем нашу функцию обработки
    });
  }
  const menu = document.querySelector('.menu_top_header');
  const modal = document.querySelector('#order');
  const submitButtom =document.querySelectorAll('.submit_button');
  const popupCloseIcon = document.querySelector('.popup__close');
  const popupOverlay= document.querySelector('.popup__overlay');
  const burger = document.querySelector('.burger');
  const mobile_menu = document.querySelector('#mobile_menu');


  burger.addEventListener('click', () =>{
    mobile_menu.classList.toggle('toggle');
    burger.classList.toggle('open');
    
  })

  mobile_menu.addEventListener('click', ()=> {
    mobile_menu.classList.toggle('toggle');
    burger.classList.toggle('open');
  })

  // Open modal

  
function openModal ()  {

}
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
      burger.classList.add('white');
    }
    else {
      menu.classList.remove('sticky');
      burger.classList.remove('white');
    }
  });


  async function submitForm(event) {
    // event.preventDefault() уже вызван в обработчике формы

    // Проверка наличия токена reCAPTCHA
    var recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]');
    if (!recaptchaResponse || !recaptchaResponse.value) {
      var errorBlock = document.getElementById('orderFormError');
      if (errorBlock) {
        errorBlock.style.display = 'block';
        errorBlock.textContent = 'Пожалуйста, пройдите капчу.';
      }
      return;
    }

    try {
      // Формируем данные формы с токеном
      const formData = new FormData(event.target);
      formData.append('g-recaptcha-response', recaptchaResponse.value);
      // Формируем запрос
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: formData
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
        var errorBlock = document.getElementById('orderFormError');
        if (errorBlock) {
          errorBlock.style.display = 'none';
          errorBlock.textContent = '';
        }
        alert(json.info);
      } else { 
        // в случае ошибки
        console.log(json);
        throw (json.info);
      }
    } catch (error) { // обработка ошибки
      var errorBlock = document.getElementById('orderFormError');
      if (errorBlock) {
        errorBlock.style.display = 'block';
        errorBlock.textContent = error;
      }
    }
  }



  

});