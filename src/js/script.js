"use strict";

document.addEventListener('DOMContentLoaded', () =>{
  // Добавляем обработчик на отправку формы заказа
  const orderForm = document.querySelector('#orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Блокируем стандартную отправку
      submitForm(e, 'orderFormError', 'formLoader'); // Вызываем нашу функцию обработки
    });
  }
  
  // Добавляем обработчик на отправку формы обратной связи
  const feedbackForm = document.querySelector('#form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitForm(e, 'feedbackFormError', 'feedbackFormLoader');
    });
  }
  
  // Добавляем hover-эффект при клике на все кнопки "Заказать"
  const orderButtons = document.querySelectorAll('.form__button, .feedback__button, button[type="submit"]');
  
  // Функция для снятия активного состояния со всех кнопок
  function removeActiveStateFromAllButtons() {
    orderButtons.forEach(button => {
      button.classList.remove('button-active');
    });
  }
  
  // Добавляем обработчики для каждой кнопки
  orderButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Сначала снимаем активность со всех кнопок
      removeActiveStateFromAllButtons();
      // Затем добавляем активность на текущую кнопку
      this.classList.add('button-active');
      e.stopPropagation(); // Предотвращаем всплытие события
    });
  });
  
  // Снимаем активность при клике в любом месте страницы
  document.addEventListener('click', function() {
    removeActiveStateFromAllButtons();
  });
  
  // Чтобы не снимать активность при переключении между полями формы
  const formInputs = document.querySelectorAll('.form__input, .form__chekbox');
  formInputs.forEach(input => {
    input.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
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


  async function submitForm(event, errorBlockId = 'orderFormError', loaderId = 'formLoader') {
    // event.preventDefault() уже вызван в обработчике формы
    
    // Получаем ссылки на элементы формы
    const errorBlock = document.getElementById(errorBlockId);
    const loader = document.getElementById(loaderId);
    
    // Скрываем сообщения об ошибках
    if (errorBlock) {
      errorBlock.style.display = 'none';
      errorBlock.textContent = '';
    }

    // Проверка наличия токена reCAPTCHA в текущей форме
    let recaptchaResponse = event.target.querySelector('[name="g-recaptcha-response"]');
    
    // Если не нашли в форме, попробуем найти капчу внутри формы
    if (!recaptchaResponse || !recaptchaResponse.value) {
      // Попробуем найти div с капчей внутри формы
      const recaptchaDiv = event.target.querySelector('.g-recaptcha');
      if (recaptchaDiv) {
        // Проверяем, есть ли в нём ответ от капчи
        const recaptchaId = recaptchaDiv.getAttribute('data-widget-id');
        if (recaptchaId && typeof grecaptcha !== 'undefined') {
          const response = grecaptcha.getResponse(recaptchaId);
          if (response) {
            // Если есть ответ, создаем скрытое поле и добавляем его в форму
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'g-recaptcha-response';
            input.value = response;
            event.target.appendChild(input);
            recaptchaResponse = input;
          }
        }
      }
    }
    
    // Если всё равно нет токена, показываем ошибку
    if (!recaptchaResponse || !recaptchaResponse.value) {
      if (errorBlock) {
        errorBlock.style.display = 'block';
        errorBlock.textContent = 'Пожалуйста, пройдите капчу.';
      }
      return;
    }

    try {
      // Показываем лоадер
      if (loader) loader.style.display = 'block';
      
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
        if (errorBlock) {
          errorBlock.style.display = 'none';
          errorBlock.textContent = '';
        }
        
        // Очищаем поля формы
        event.target.reset();
        
        // Сбрасываем капчу
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
        }
        
        // Закрываем модальное окно заказа, если оно открыто
        const orderModal = document.getElementById('order');
        if (orderModal && orderModal.classList.contains('popup_show')) {
          orderModal.classList.remove('popup_show');
          orderModal.style.visibility = 'hidden';
        }
        
        // Показываем модальное окно успеха
        setTimeout(() => {
          showSuccessModal();
        }, 300); // Небольшая задержка для плавности
      } else { 
        // в случае ошибки
        console.log(json);
        throw (json.info);
      }
    } catch (error) { // обработка ошибки
      console.error('Form submission error:', error);
      
      // Показываем блок с ошибкой
      if (errorBlock) {
        errorBlock.style.display = 'block';
        if (error.includes('reCAPTCHA')) {
          errorBlock.textContent = 'Ошибка проверки капчи. Попробуйте обновить страницу и пройти капчу заново.';
        } else {
          errorBlock.textContent = error;
        }
      }
      
      // Сброс капчи при ошибке
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
      }
    } finally {
      // Скрываем лоадер в любом случае
      if (loader) loader.style.display = 'none';
    }
  }



  

});