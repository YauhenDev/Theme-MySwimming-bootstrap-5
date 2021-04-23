// 'use strict';

window.addEventListener('DOMContentLoaded', () => {

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

	// Вместо установки в HTML будем через innerHTML
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
						<a 
							href="https://yandex.by/maps/-/CCQ3NRb6XA" 
							target="_blank" title="Открыть Yandex.Карты" 
							rel="nofollow"  
							class="bs-0"
						>
							<img src="assets/img/img-svg/maps-yandex-icon.svg"><br/>
							Yandex<span class="d-none d-sm-inline">.Карты</span>
						</a>
					</div>
					<div class="col-6 col-md-3 align-self-end text-center py-4">
						<a 
							href="https://g.page/MySwimming?share" 
							target="_blank" title="Открыть Google.Карты" 
							rel="nofollow"  
							class="bs-0"
						>
							<img src="assets/img/img-svg/maps-google-icon.svg"><br/>
							Google<span class="d-none d-sm-inline">.Карты</span>
						</a>
					</div>
					<div class="col-6 col-md-3 align-self-end text-center py-4">
						<a 
							href="https://map.by/belarus/streets/%D0%9C%D0%B8%D0%BD%D1%81%D0%BA/%D0%94/%D0%94%D0%BE%D0%BB%D0%B3%D0%BE%D0%B1%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D1%8F+%D1%83%D0%BB%D0%B8%D1%86%D0%B0/37" 
							target="_blank" 
							title="Открыть MAP.by" 
							rel="nofollow"  
							class="bs-0"
						>
							<img src="assets/img/img-svg/maps-mapby-icon.svg"><br/>
							MAP.by
						</a>
					</div>
					<div class="col-6 col-md-3 align-self-end text-center py-4" title="Открыть карту на сайте">
						<a 
							href="/contacts/" 
							class="bs-0"
						>
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
	


});