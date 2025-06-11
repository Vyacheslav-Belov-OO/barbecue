"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

document.addEventListener('DOMContentLoaded', function () {
  // Добавляем обработчик на отправку формы
  var orderForm = document.querySelector('#orderForm');

  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Блокируем стандартную отправку

      submitForm(e); // Вызываем нашу функцию обработки
    });
  } // Добавляем hover-эффект при клике на все кнопки "Заказать"


  var orderButtons = document.querySelectorAll('.form__button, .feedback__button, button[type="submit"]'); // Функция для снятия активного состояния со всех кнопок

  function removeActiveStateFromAllButtons() {
    orderButtons.forEach(function (button) {
      button.classList.remove('button-active');
    });
  } // Добавляем обработчики для каждой кнопки


  orderButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      // Сначала снимаем активность со всех кнопок
      removeActiveStateFromAllButtons(); // Затем добавляем активность на текущую кнопку

      this.classList.add('button-active');
      e.stopPropagation(); // Предотвращаем всплытие события
    });
  }); // Снимаем активность при клике в любом месте страницы

  document.addEventListener('click', function () {
    removeActiveStateFromAllButtons();
  }); // Чтобы не снимать активность при переключении между полями формы

  var formInputs = document.querySelectorAll('.form__input, .form__chekbox');
  formInputs.forEach(function (input) {
    input.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });
  var menu = document.querySelector('.menu_top_header');
  var modal = document.querySelector('#order');
  var submitButtom = document.querySelectorAll('.submit_button');
  var popupCloseIcon = document.querySelector('.popup__close');
  var popupOverlay = document.querySelector('.popup__overlay');
  var burger = document.querySelector('.burger');
  var mobile_menu = document.querySelector('#mobile_menu');
  burger.addEventListener('click', function () {
    mobile_menu.classList.toggle('toggle');
    burger.classList.toggle('open');
  });
  mobile_menu.addEventListener('click', function () {
    mobile_menu.classList.toggle('toggle');
    burger.classList.toggle('open');
  }); // Open modal

  function openModal() {}

  submitButtom.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      modal.classList.add('popup_show');
      modal.style.visibility = 'visible';
      console.log(1);
    });
  }); //Close Modal

  popupCloseIcon.addEventListener('click', function () {
    modal.classList.remove('popup_show');
    modal.style.visibility = 'hidden';
  });
  popupOverlay.addEventListener('click', function () {
    modal.classList.remove('popup_show');
    modal.style.visibility = 'hidden';
  }); // const modal = document.querySelector('#order');
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

  window.addEventListener('scroll', function (e) {
    if (window.scrollY >= 100) {
      menu.classList.add('sticky');
      burger.classList.add('white');
    } else {
      menu.classList.remove('sticky');
      burger.classList.remove('white');
    }
  });

  function submitForm(_x) {
    return _submitForm.apply(this, arguments);
  }

  function _submitForm() {
    _submitForm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
      var errorBlock, loader, recaptchaResponse, formData, response, contentType, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // event.preventDefault() уже вызван в обработчике формы
              // Получаем ссылки на элементы формы
              errorBlock = document.getElementById('orderFormError');
              loader = document.getElementById('formLoader'); // Скрываем сообщения об ошибках

              if (errorBlock) {
                errorBlock.style.display = 'none';
                errorBlock.textContent = '';
              } // Проверка наличия токена reCAPTCHA


              recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]');

              if (!(!recaptchaResponse || !recaptchaResponse.value)) {
                _context.next = 7;
                break;
              }

              if (errorBlock) {
                errorBlock.style.display = 'block';
                errorBlock.textContent = 'Пожалуйста, пройдите капчу.';
              }

              return _context.abrupt("return");

            case 7:
              _context.prev = 7;
              // Показываем лоадер
              if (loader) loader.style.display = 'block'; // Формируем данные формы с токеном

              formData = new FormData(event.target);
              formData.append('g-recaptcha-response', recaptchaResponse.value); // Формируем запрос

              _context.next = 13;
              return fetch(event.target.action, {
                method: 'POST',
                body: formData
              });

            case 13:
              response = _context.sent;

              if (response.ok) {
                _context.next = 16;
                break;
              }

              throw "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443: ".concat(response.status);

            case 16:
              // проверяем, что ответ действительно JSON
              contentType = response.headers.get('content-type');

              if (!(!contentType || !contentType.includes('application/json'))) {
                _context.next = 19;
                break;
              }

              throw 'Ошибка обработки. Ответ не JSON';

            case 19:
              _context.next = 21;
              return response.json();

            case 21:
              json = _context.sent;

              if (!(json.result === "success")) {
                _context.next = 27;
                break;
              }

              // в случае успеха
              if (errorBlock) {
                errorBlock.style.display = 'none';
                errorBlock.textContent = '';
              }

              alert(json.info);
              _context.next = 29;
              break;

            case 27:
              // в случае ошибки
              console.log(json);
              throw json.info;

            case 29:
              _context.next = 36;
              break;

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](7);
              // обработка ошибки
              console.error('Form submission error:', _context.t0); // Показываем блок с ошибкой

              if (errorBlock) {
                errorBlock.style.display = 'block';

                if (_context.t0.includes('reCAPTCHA')) {
                  errorBlock.textContent = 'Ошибка проверки капчи. Попробуйте обновить страницу и пройти капчу заново.';
                } else {
                  errorBlock.textContent = _context.t0;
                }
              } // Сброс капчи при ошибке


              if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
              }

            case 36:
              _context.prev = 36;
              // Скрываем лоадер в любом случае
              if (loader) loader.style.display = 'none';
              return _context.finish(36);

            case 39:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 31, 36, 39]]);
    }));
    return _submitForm.apply(this, arguments);
  }
});