'use strict';

window.addEventListener('DOMContentLoaded', () => {

	// NAVBAR ********************************************
	const nav = document.querySelector("nav.navbar"),
		  navButton = nav.querySelector('#menuBurger'),
		  navContainer = nav.querySelector("#fixWidth"),
		  navMobileMenu = navContainer.querySelector("#navbarsMswimming"),
		  price = document.querySelectorAll("[itemprop='price']"),
		  scene = document.querySelectorAll('[data-prl]'),
		  footer = document.querySelector("footer"),
		  footerToggle = footer.querySelectorAll(".footer__menuBlock"),
		  footerCopyright = footer.querySelector(".footer__copyright"),
		  footerDesign = footer.querySelector(".footer__design"),
		  footerRequisites = footer.querySelector("p.footer___requisites"),
		  thisYear = new Date();
	
	// Добавляем цены на  всем сайте
	function addPrice() {
		price.forEach((item, cost) => {
			if (item.matches(".price__individual")) {
				cost = 36	// индивидуалка
			} else {
				cost = 14	// груповое
			}
			item.innerHTML = cost;
		});
	}
	addPrice();

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

	
	// меняем jpg на WEBP если поддерживается
	// *************************************
	const allBigJPG = document.querySelectorAll("img[data-jpg]");

	//проверяем поддерживается ли webp

	// c созданием картинки
	// function testWebP(callback) {
	// 	const webP = new Image();
	// 	webP.onload = webP.onerror = function() {
	// 	  callback(webP.height == 2);
	// 	};
	// 	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	// }

	// Используя функцию canvas.toDataUrl() вместо изображения в 
	// качестве способа обнаружения объекта:
	function support_format_webp() {
		const elem = document.createElement('canvas');
		if (!!(elem.getContext && elem.getContext('2d'))) {
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
		} else {
			return false;
		}
	};

	allBigJPG.forEach(item => {
		const jpgSource = item.getAttribute('data-jpg-source');
		if ( support_format_webp = true) {
			//item.src = jpgSource;
			item.src = jpgSource.replace('.jpg', '.webp');
		} else {
			item.src = jpgSource;
		}

	});
	
	// Запускаем паралакс для найденных элементов
	scene.forEach((item) => {
		const parallax = new Parallax(item);
	});

	//активация анимации wow.js
	const wow = new WOW({
		//boxClass:     'wow',      // default
		//offset:       0,          // default
		mobile:       false,       // default
		//live:         true        // default
	  });
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

	// МОДАЛКА *********************************************
	// *****************************************************

	const modal = document.querySelector('.modal'),
		  modalDialog = modal.querySelector('.modal-dialog'),
		  mapLinkModal = document.querySelector('#map-index a');

	//ставим по умолчанию id / атрибуты для модалки
	modal.id = "mapModalCenter";
	modal.setAttribute('aria-labelledby', 'mapModalCenterTitle');

	// Хочется сложностей. Вместо просто установки через innerHTML
	// Будем добавлять и очищать на лету )))

	// функция очистки модалки
	function clearModal() {
		modalDialog.innerHTML = ``;
	}
	
	//добавляем карту
	mapLinkModal.addEventListener('click', () => {
		//создаем див
		const mapContent = document.createElement('div');
		mapContent.classList.add('modal-content');
		mapContent.innerHTML = `
			<div class="modal-header">
				<h5 class="modal-title" id="mapModalCenterTitle">
					Открыть карту
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-6 col-md-3 align-self-end text-center py-4">
						<a href="https://yandex.by/maps/-/CCQ3NRb6XA" target="_blank" title="Открыть Yandex.Карты" rel="nofollow"  class="bs-0">
							<img src="assets/img/img-svg/maps-yandex-icon.svg"><br/>
							Yandex<span class="d-none d-sm-inline">.Карты</span>
						</a>
					</div>
					<div class="col-6 col-md-3 align-self-end text-center py-4">
						<a href="https://g.page/MySwimming?share" target="_blank" title="Открыть Google.Карты" rel="nofollow"  class="bs-0">
							<img src="assets/img/img-svg/maps-google-icon.svg"><br/>
							Google<span class="d-none d-sm-inline">.Карты</span>
						</a>
					</div>
					<div class="col-6 col-md-3 align-self-end text-center py-4">
						<a href="https://map.by/belarus/streets/%D0%9C%D0%B8%D0%BD%D1%81%D0%BA/%D0%94/%D0%94%D0%BE%D0%BB%D0%B3%D0%BE%D0%B1%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F+%D1%83%D0%BB%D0%B8%D1%86%D0%B0/37" target="_blank" title="Открыть MAP.by" rel="nofollow"  class="bs-0">
							<img src="assets/img/img-svg/maps-mapby-icon.svg"><br/>
							MAP.by
						</a>
					</div>
					<div class="col-6 col-md-3 align-self-end text-center py-4" title="Открыть карту на сайте">
						<a href="/contacts/" class="bs-0">
							<picture>
								<source type="image/webp" srcset="assets/img/webp/shkola-plaveniya-logo.webp">
								<source type="image/png" srcset="assets/img/shkola-plaveniya-logo.png">
								<img src="assets/img/shkola-plaveniya-logo.png" class="logo-color" alt="Школа Плавания MySwimming">
							</picture><br/>
							На сайте
						</a>
					</div>
				</div>
			</div>
		`;
		//апендим контент в диалог
		modalDialog.append(mapContent);

		//Прослушиваем закрытие модального окна
		modal.addEventListener('hidden.bs.modal', () => {
			clearModal();
		});
	}); 


	// ЗАЯВКА
	const modalZayavka = modal.cloneNode(true),
		  modalDialogZayavka = modalZayavka.querySelector('.modal-dialog');
		  //zayavkaLinkModal = document.querySelectorAll('[data-target="#modalZV"]');

	modal.after(modalZayavka);

	modalZayavka.id = "modalZV";
	modalZayavka.setAttribute('aria-labelledby', 'zayavkaModal');
	modalDialogZayavka.classList.add('modal-lg');
	modalDialogZayavka.innerHTML = `
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="modal-title" id="mapModalCenterTitle">
					Заявка в школу плавания
				</h3>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body mb-0 p-0">
			<div class="zayavka-body embed-responsive">
				<iframe class="embed-responsive-item" data-frame-group="zvk_myswm" data-frame-src="/zayavka.html" frameborder="0" allowfullscreen></iframe>
			</div>
			</div>
		</div>
	`;

	// добавляем iframe в модалку
	[...document.querySelectorAll('[data-frame-load]')].forEach(button => {
		button.addEventListener('click', () => {
			const group = button.getAttribute('data-frame-load');
			[...document.querySelectorAll(`[data-frame-group="${group}"]`)].forEach(frame => {
				frame.setAttribute('src', frame.getAttribute('data-frame-src'));
			});
		});
	});

	//Добавляем телефоны (видны только в мобильном)
	const mobilePhone = document.createElement('div');
	mobilePhone.id = "bottom-panel";
	mobilePhone.classList.add('jumbotron');
	mobilePhone.innerHTML = `
		<div class="row g-0">
			<div class="col-6 d-lg-none">
				<a href="tel:+375298985638" class="btn w-100 tel-mts konv_mts" onclick="yaCounter45395127.reachGoal('CallMeMTS'); return true;">(29) 898 56 38</a>
			</div>
			<div class="col-6 d-lg-none">
				<a href="tel:+375293885638" class="btn w-100 tel-vlc konv_velcom" onclick="yaCounter45395127.reachGoal('CallMeVELCOM'); return true;">(29) 388 56 38</a>
			</div>
		</div>
	`;
	footer.after(mobilePhone);

	// Выводим копирайт
	footerCopyright.innerHTML = `© 2017 — ${thisYear.getFullYear()} MySwimming`;
	footerRequisites.innerHTML = `Частное предприятие «МОЙ ПЛАВАТЕЛЬНЫЙ ЦЕНТР», УНП 192954575. Свидетельство о гос.регистрации №192954575 от 14 августа 2017 года, выданное Минским горисполкомом`;
	footerDesign.innerHTML = `Design <a href="https://whale.by" class="fs-c" target="_blank" title="Design Whale Studio" rel="nofollow">Whale Studio</a>`;


});