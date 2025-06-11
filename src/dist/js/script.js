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
  }

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
      var recaptchaResponse, errorBlock, formData, response, contentType, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // event.preventDefault() уже вызван в обработчике формы
              // Проверка наличия токена reCAPTCHA
              recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]');

              if (!(!recaptchaResponse || !recaptchaResponse.value)) {
                _context.next = 5;
                break;
              }

              errorBlock = document.getElementById('orderFormError');

              if (errorBlock) {
                errorBlock.style.display = 'block';
                errorBlock.textContent = 'Пожалуйста, пройдите капчу.';
              }

              return _context.abrupt("return");

            case 5:
              _context.prev = 5;
              // Формируем данные формы с токеном
              formData = new FormData(event.target);
              formData.append('g-recaptcha-response', recaptchaResponse.value); // Формируем запрос

              _context.next = 10;
              return fetch(event.target.action, {
                method: 'POST',
                body: formData
              });

            case 10:
              response = _context.sent;

              if (response.ok) {
                _context.next = 13;
                break;
              }

              throw "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443: ".concat(response.status);

            case 13:
              // проверяем, что ответ действительно JSON
              contentType = response.headers.get('content-type');

              if (!(!contentType || !contentType.includes('application/json'))) {
                _context.next = 16;
                break;
              }

              throw 'Ошибка обработки. Ответ не JSON';

            case 16:
              _context.next = 18;
              return response.json();

            case 18:
              json = _context.sent;

              if (!(json.result === "success")) {
                _context.next = 25;
                break;
              }

              // в случае успеха
              errorBlock = document.getElementById('orderFormError');

              if (errorBlock) {
                errorBlock.style.display = 'none';
                errorBlock.textContent = '';
              }

              alert(json.info);
              _context.next = 27;
              break;

            case 25:
              // в случае ошибки
              console.log(json);
              throw json.info;

            case 27:
              _context.next = 33;
              break;

            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](5);
              // обработка ошибки
              errorBlock = document.getElementById('orderFormError');

              if (errorBlock) {
                errorBlock.style.display = 'block';
                errorBlock.textContent = _context.t0;
              }

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 29]]);
    }));
    return _submitForm.apply(this, arguments);
  }
});