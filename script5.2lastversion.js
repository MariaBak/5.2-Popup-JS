//когда загружена вся страница
window.onload = function() {
  validateFormControl();
  modalWindowBehavior();
  performButtonClick();
}

//1. Появление фильмов от прозрачного к непрозрачному
function performButtonClick() {
  var button = document.getElementById('button_movies');
  button.addEventListener('click', function () {
    document.getElementById('button_movies').style = 'display:none';
    document.getElementById('box_movies').style = 'display:block';
    changeOpacity(document.getElementById('box_movies'), 100); //вызов функции, speed 100 это задержка раз в сек увеличивается счетчик, передали как константу в функцию
    function changeOpacity(element, speed) {  //element = document.getElementById('box_movies'), speed = 100 
      setInterval(function () {
        if (+ element.style.opacity < 1) { // унарный плюс преобразуем строку к числу 
          element.style.opacity = + element.style.opacity + 0.05; // шаг 0.05
        }
      }, speed) // задержка через миллисек счетчик работает
    }
  })
}

// работает второй вариант появления фильмов
box_movies.addEventListener('mouseup', function() {
  var timer;
  window.clearTimeout(timer);
  var opacity = 10;
  function animation(duration) {
    box_movies.style.opacity = ++opacity/100;
    if( opacity < 100 ) timer = setTimeout(animation, duration, duration);
  }
  animation(25)
});

//2. Проверка формы на пустые поля
function validateFormControl() {
  document.getElementById('submit').addEventListener('click',  validateForm);
  document.getElementById('username').addEventListener('click', changeField);
  document.getElementById('useremail').addEventListener('click', changeField);
  document.getElementById('message').addEventListener('click', changeField);
  function validateForm() { 
    var valid = true; 
    var control = document.getElementsByClassName('form_control'); 
    for (var count = 0; count < control.length; count++) { 
      if ( control[count].value == '' ) { 
        control[count].classList.add('error_field'); 
        valid = false; 
      } 
      else{ 
        control[count].classList.remove('error_field'); 
      } 
    } 
    if (valid) { 
      closeModalWindow();
    } 
  }
  function changeField() {
    var control = document.getElementsByClassName('form_control'); 
    for (var count = 0; count < control.length; count++) { 
      if ( control[count].value == '' ) { 
        control[count].classList.add('error_field'); 
        valid = false; 
      } 
      else { 
        control[count].classList.remove('error_field'); 
      } 
    } 
  }
}

/*
function validateFormControl() {
  var inputText = document.getElementsByClassName('form_control');
  var button = document.getElementById('submit');

  button.addEventListener('click', check, false);

  for (var count = 0; count < 4; count++) {
    inputText[count].onblur = function () {
      if (this.value == '') {
        this.style.border = '1px solid red';
      }
      else {
        this.style.border = '';
      }
    }
    inputText[count].onfocus = function () {
      this.style.border = '';
    }
  }
  function check() {
    var boolCount = 0;
    for (var count = 0; count < inputText.length; count++) {
      var text = inputText[count].value;
      if (text === '') {
        inputText[count].style.border = '1px solid red';
      }
      else {
        inputText[count].style.border = '';
        boolCount++;
      }
      event.preventDefault();
    }
    if (boolCount === 3) {
      closeModalWindow();
    }
  }
}*/


//3. Модальное окно (popup)
function modalWindowBehavior() {
  document.getElementById('pop_light').addEventListener('click', showModalWindow);
  document.getElementById('close').addEventListener('click', closeModalWindow);
  function showModalWindow() {
    var darkLayer = document.createElement('div'); // слой затемнения
    darkLayer.className = 'shadow'; // класс чтобы подхватить стиль
    darkLayer.setAttribute('id', 'darkLayer'); // установили id = darkLayer, var darkLayer = document.createElement('div'); 
    document.body.appendChild(darkLayer); //включили затемнение в конце родителя
    var modalWindow = document.getElementById('popup_contact'); //  окно
    modalWindow.style.display = 'block'; // включили его
    darkLayer.onclick = function () {
      darkLayer.parentNode.removeChild(darkLayer);
      modalWindow.style.display = 'none';
    }
  }
  function closeModalWindow() {
    var modalWinClose = document.getElementById('popup_contact');
    modalWinClose.style.display = 'none';
    document.body.removeChild(darkLayer);
  }
}

function closeModalWindow() {
  var modalWinClose = document.getElementById('popup_contact');
  modalWinClose.style.display = 'none';
  document.body.removeChild(darkLayer);
}