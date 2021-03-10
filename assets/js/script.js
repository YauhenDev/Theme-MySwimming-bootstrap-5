'use strict';

window.addEventListener('DOMContentLoaded', () => {

	// NAVBAR ********************************************
	const nav = document.querySelector("nav.navbar"),
		  navButton = nav.querySelector('#menuBurger'),
		  navContainer = nav.querySelector("#fixWidth"),
		  navMobileMenu = navContainer.querySelector("#navbarsMswimming"),
		  scene = document.querySelectorAll('[data-prl]'),
		  footer = document.querySelector("footer"),
		  footerToggle = footer.querySelectorAll(".footer__menuBlock");

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
    });

	// FOOTER *******************************
	//включаем показ меню в футере
	footerToggle.forEach(item => {
		item.addEventListener('click', () => {
			if ( document.documentElement.clientWidth < 768 && item.classList.contains('showMenu')) {
				item.classList.remove('showMenu');
			} else if (document.documentElement.clientWidth < 768) {
				item.classList.add('showMenu');
			} 
		});
	});

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
	
	// Запускаем паралакс для найденных элементов
	scene.forEach((item) => {
		const parallax = new Parallax(item);
	});

	//активация анимации wow.js
	const wow = new WOW(/*{
		boxClass:     'wow',      // default
		offset:       0,          // default
		mobile:       true,       // default
		live:         true        // default
	  }*/);
	  wow.init();

	  //активация SWIPER
	  const swiper = new Swiper('.swiper-container', {
		//slidesPerView: 4,
		centeredSlides: false,
		spaceBetween: 5,
		pagination: {
		  el: '.swiper-pagination',
		  clickable: true,
		},
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		breakpoints: {
		  576: {
			slidesPerView: 1,
			spaceBetween: 5,
		  },
		  768: {
			slidesPerView: 2,
			spaceBetween: 5,
		  },
		  992: {
			slidesPerView: 4,
			spaceBetween: 5,
		  },
		  1200: {
			slidesPerView: 4,
			spaceBetween: 5,
		  },
		}
  
	  });

});