'use strict';

window.addEventListener('DOMContentLoaded', () => {

	// NAVBAR ********************************************
	const nav = document.querySelector("nav.navbar"),
		  navButton = nav.querySelector('#menuBurger'),
		  navContainer = nav.querySelector("#fixWidth"),
		  navMobileMenu = navContainer.querySelector("#navbarsMswimming");

	// Подмениваем классы navbara и бургер
	function tglMenu() {
	
		//меняем цвет фона nav при открытии
		nav.classList.toggle('bg-white');
		nav.classList.toggle('bg-info');

		//убираем скролл документа при открытии меню
		if ( nav.classList.contains("bg-info")) {   
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
			navMobileMenu.classList.remove('show');
		}

	}

	navButton.addEventListener('click', tglMenu);

	//Убираем меню по  кнопки ESC
	document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && nav.classList.contains('bg-info') && navButton.checked) {
			tglMenu();
			navButton.checked = false;
        }
    })

	//Проверяем ширину экрана. Подмениваем классы
	function windowWidth() {
		//Меняем container если экран меньше 1400
		if ( document.documentElement.clientWidth < 1400 ) {   
			navContainer.classList.remove('container');
			navContainer.classList.add('container-fluid');
		} else {
			navContainer.classList.add('container');
			navContainer.classList.remove('container-fluid');
		}

		//Закрываем открытое мобильное меню при ресайсзе
		if ( document.documentElement.clientWidth > 992 && nav.classList.contains('bg-info') && navButton.checked) {
			tglMenu();
			navButton.checked = false;
		} 
	};
	windowWidth();

	//Прослушаваем постоянно ширину экрана.
	window.addEventListener('resize', windowWidth);
	
	// Запускаем паралакс для элементов
	const scene = document.querySelectorAll('[data-prl]');
	scene.forEach((item) => {
		//console.log(item);
		const parallax = new Parallax(item);
	});


});