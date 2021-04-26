// 'use strict';

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
		  thisYear = new Date();
	
	// Добавляем цены на  всем сайте
	function addPrice() {
		price.forEach((item, cost) => {
			if (item.matches(".price__individual")) {
				cost = 34	// индивидуалка
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
        if (e.code === 'Escape' && 
			nav.classList.contains('bg-info') && 
			navButton.checked) {
				tglMenu();
				navButton.checked = false;
		}
    });

	// FOOTER *******************************
	//включаем показ меню в футере
	footerToggle.forEach(item => {
		item.addEventListener('click', () => {
			if ( document.documentElement.clientWidth < 768 
				&& item.classList.contains('showMenu')) {
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
	//const allBigJPG = document.querySelectorAll("img[data-jpg]");

	// Используя функцию canvas.toDataUrl() вместо изображения в 
	// качестве способа обнаружения объекта:
	/* 
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
	*/

	// Запускаем паралакс для найденных элементов
	scene.forEach((item) => {
		const parallax = new Parallax(item);
	});

	//активация анимации wow.js
	const wow = new WOW({
		mobile:       false,       // default
	  });
	  wow.init();


	// МОДАЛКА *********************************************
	// *****************************************************

	const modal = document.querySelector('.modal');

	// ЗАЯВКА
	const modalZayavka = modal.cloneNode(true),
		  modalDialogZayavka = modalZayavka.querySelector('.modal-dialog');

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
				<button 
					type="button" 
					class="btn-close" 
					data-bs-dismiss="modal" 
					aria-label="Close">
				</button>
			</div>
			<div class="modal-body mb-0 p-0">
			<div class="zayavka-body embed-responsive">
				<iframe 
					class="embed-responsive-item" 
					data-frame-group="zvk_myswm" 
					data-frame-src="zayavka.html" 
					frameborder="0" 
					allowfullscreen>
				</iframe>
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
				<a 
					href="tel:+375298985638" 
					class="btn w-100 tel-mts konv_mts" 
					onclick="yaCounter45395127.reachGoal('CallMeMTS'); 
					return true;"
				>
					(29) 898 56 38
				</a>
			</div>
			<div class="col-6 d-lg-none">
				<a 
					href="tel:+375293885638" 
					class="btn w-100 tel-vlc konv_velcom" 
					onclick="yaCounter45395127.reachGoal('CallMeVELCOM'); 
					return true;"
				>
					(29) 388 56 38
				</a>
			</div>
		</div>
	`;
	footer.after(mobilePhone);

	// Выводим копирайт
	footerCopyright.innerHTML = `© 2017 — ${thisYear.getFullYear()} MySwimming`;

});