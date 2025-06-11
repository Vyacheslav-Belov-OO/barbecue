"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

document.addEventListener('DOMContentLoaded', function () {
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
      var recaptchaField, recaptchaResponse, formData, response, contentType, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
              // Проверка наличия токена reCAPTCHA

              recaptchaField = event.target.querySelector('.g-recaptcha');
              recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]');

              if (!(!recaptchaResponse || !recaptchaResponse.value)) {
                _context.next = 6;
                break;
              }

              alert('Пожалуйста, подтвердите, что вы не робот.');
              return _context.abrupt("return");

            case 6:
              _context.prev = 6;
              // Формируем данные формы с токеном
              formData = new FormData(event.target);
              formData.append('g-recaptcha-response', recaptchaResponse.value); // Формируем запрос

              _context.next = 11;
              return fetch(event.target.action, {
                method: 'POST',
                body: formData
              });

            case 11:
              response = _context.sent;

              if (response.ok) {
                _context.next = 14;
                break;
              }

              throw "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443: ".concat(response.status);

            case 14:
              // проверяем, что ответ действительно JSON
              contentType = response.headers.get('content-type');

              if (!(!contentType || !contentType.includes('application/json'))) {
                _context.next = 17;
                break;
              }

              throw 'Ошибка обработки. Ответ не JSON';

            case 17:
              _context.next = 19;
              return response.json();

            case 19:
              json = _context.sent;

              if (!(json.result === "success")) {
                _context.next = 24;
                break;
              }

              // в случае успеха
              alert(json.info);
              _context.next = 26;
              break;

            case 24:
              // в случае ошибки
              console.log(json);
              throw json.info;

            case 26:
              _context.next = 31;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](6);
              // обработка ошибки
              alert(_context.t0);

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 28]]);
    }));
    return _submitForm.apply(this, arguments);
  }
});