ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        //center: [53.916586, 27.617342],
        center: [53.906158, 27.569442],
        zoom: 11,
		controls: ['zoomControl'],
    }),

        // Создаем геообъект с типом геометрии "Точка".
        /*
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.8, 37.8]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Метка',
                balloonContent: 'Меня можно перемещать'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'twirl#redStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        }),
		*/
        
        // Создаем метку с помощью вспомогательного класса.
        /*
        myPlacemark1 = new ymaps.Placemark([55.8, 37.6], {
            // Свойства.
            // Содержимое иконки, балуна и хинта.
            iconContent: '1',
            balloonContent: 'Балун',
            hintContent: 'Стандартный значок метки'
        }, {
            // Опции.
            // Стандартная фиолетовая иконка.
            preset: 'twirl#violetIcon'
        }),
				*/

        myPlacemark2 = new ymaps.Placemark([53.887367,27.618782], {
            // Свойства.
            hintContent: 'Собственный значок метки'
        }, {
            // Опции.
			// Своё изображение иконки метки.
			iconLayout: 'default#image',
			iconImageHref: 'assets/img/img-svg/map-r.svg', // картинка иконки
			// Размеры метки.
			iconImageSize: [197, 52],
			// Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
			iconImageOffset: [-30, -50]
        });

    //myMap.controls.add('smallZoomControl');
    // Добавляем все метки на карту.
    myMap.geoObjects.add(myPlacemark2);
        //.add(myPlacemark2)
        //.add(myGeoObject);
}
