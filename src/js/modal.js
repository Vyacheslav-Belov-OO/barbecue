$(document).ready(function () {
    /* Popup */
	
	// Add popup content wrapper, close icon and overlay 
	$('.popup').wrapInner('<div class="popup__box"></div>');
	$('<div class="popup__close"><div class="popup__close-icon"></div></div>').appendTo('.popup__box');
	$('<div class="popup__overlay"></div>').appendTo('.popup');

	// Open popup 
	function openPopup($targetPopup) {
		$($targetPopup).css('visibility', 'visible'); // РѕС‚РѕР±СЂР°Р¶Р°РµРј СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‰РёР№ РїРѕРїР°Рї
		$($targetPopup).addClass('popup_show'); // РґРѕР±Р°РІР»СЏРµРј РєР»Р°СЃСЃ РґР»СЏ Р°РЅРёРјР°С†РёРё РїРѕСЏРІР»РµРЅРёСЏ
		
		/* Р‘Р»РѕРєРёСЂРѕРІРєР° СЃРєСЂРѕР»Р»Р° СЃ РїРѕРјРѕС‰СЊСЋ Р±РёР±Р»РёРѕС‚РµРєРё scroll-lock.min.js 
			Сѓ fixed СЌР»РµРјРµРЅС‚РѕРІ РЅСѓР¶РЅРѕ РїСЂРѕРїРёСЃР°С‚СЊ РґР°С‚Р°-Р°С‚СЂРёР±СѓС‚: <header class="header" data-scroll-lock-fill-gap> С‡С‚РѕР±С‹ РЅРµ РґРµСЂРіР°Р»РёСЃСЊ
		
		.popup РѕСЃС‚Р°РµС‚СЃСЏ СЃ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊСЋ СЃРєСЂРѕР»Р»РёРЅРіР°, С‡С‚РѕР±С‹ Р·Р°РґР°С‚СЊ РЅРµСЃРєРѕР»СЊРєРѕ РєР»Р°СЃСЃРѕРІ РЅСѓР¶РЅРѕ РїСЂРѕРїРёСЃР°С‚СЊ document.querySelectorAll('.popup, .header, .main');
		РёР»Рё РґРѕР±Р°РІРёС‚СЊ Р°С‚СЂРёР±СѓС‚ РґР»СЏ СЌР»РµРјРµРЅС‚РѕРІ, РєРѕС‚РѕСЂС‹Рµ РґРѕР»Р¶РЅС‹ СЃРєСЂРѕР»Р»РёС‚СЃСЏ <div class="my-scrollable-element" data-scroll-lock-scrollable> */
		
		// СѓСЃР»РѕРІРёРµ length < 2 РЅСѓР¶РЅРѕ, С‡С‚РѕР±С‹ СЃРєСЂРѕР»Р» РїРѕРІС‚РѕСЂРЅРѕ РЅРµ Р±Р»РѕРєРёСЂРѕРІР°Р»СЃСЏ, РµСЃР»Рё РѕС‚РєСЂС‹РІР°РµС‚СЃСЏ РІС‚РѕСЂРѕР№ РїРѕРїР°Рї РІРЅСѓС‚СЂРё РїРѕРїР°РїР°
		if ($('.popup_show').length < 2) {
			const $scrollableElement = document.querySelectorAll('.popup');
			scrollLock.disablePageScroll($scrollableElement);
		}

		// Сѓ fixed СЌР»РµРјРµРЅС‚РѕРІ СѓР±РёСЂР°РµРј transition С‡С‚РѕР±С‹ РЅРµ РґРµСЂРіР°Р»РёСЃСЊ
		$('.header-container, .search').css('transition', 'none');
	}
	$('.popup-link').click(function (e) {
		e.preventDefault();
		var targetPopup = $(this).data('target'); // РѕРїСЂРµРґРµР»СЏРµРј РєР°РєРѕР№ РїРѕРїР°Рї РЅСѓР¶РЅРѕ РѕС‚РєСЂС‹РІР°С‚СЊ
		if(targetPopup == '#order')
		{
			$('.popup#order .section__title_alone').html('Р—РђРљРђР—РђРўР¬ '+$('.product__title').html())
		}
		openPopup(targetPopup); // РїРµСЂРµРґР°РµРј РїР°СЂР°РјРµС‚СЂ РІ С„СѓРЅРєС†РёСЋ
	});
	// РІ html-РєРѕРґРµ РјРѕР¶РЅРѕ Р»СЋР±РѕРјСѓ СЌР»РµРјРµРЅС‚Сѓ РґРѕР±Р°РІРёС‚СЊ РєР»Р°СЃСЃ .popup-link Рё data-target="#popup1" Рё Р±СѓРґРµС‚ РѕС‚РєСЂС‹РІР°С‚СЊСЃСЏ СЌС‚РѕС‚ РїРѕРїР°Рї

	// Close popup 
	function closePopup($activePopup) {
		if ($('.popup_show').length > 1) {
			// РµСЃР»Рё РѕС‚РєСЂС‹С‚С‹С… РїРѕРїР°РїРѕРІ Р±РѕР»СЊС€Рµ РѕРґРЅРѕРіРѕ, С‚.Рµ. РІРЅСѓС‚СЂРё РїРѕРїР°РїР° РѕС‚РєСЂС‹С‚ РґСЂСѓРіРѕР№ РїРѕРїР°Рї, С‚Рѕ Р·Р°РєСЂС‹РІР°РµРј С‚РѕР»СЊРєРѕ С‚РµРєСѓС‰РёР№ РїРѕРїР°Рї Рё СЃРєСЂРѕР» РѕСЃС‚Р°РµС‚СЃСЏ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅРЅС‹Рј
			$($activePopup).removeClass('popup_show').css('visibility', 'hidden'); // Р·Р°РєСЂС‹РІР°РµРј РїРѕРїР°Рї
		}	else {
			// РµСЃР»Рё РѕС‚РєСЂС‹С‚ РѕРґРёРЅ РїРѕРїР°Рї, С‚Рѕ Р·Р°РєСЂС‹РІР°РµРј РµРіРѕ Рё СЂР°Р·Р±Р»РѕРєРёСЂСѓРµРј СЃРєСЂРѕР»Р»
			$($activePopup).removeClass('popup_show').css('visibility', 'hidden'); // Р·Р°РєСЂС‹РІР°РµРј РїРѕРїР°Рї
			scrollLock.enablePageScroll(); // СЂР°Р·Р±Р»РѕРєРёСЂСѓРµРј СЃРєСЂРѕР»Р»
		}
	}
	$('.popup__close, .popup__overlay, .popup-close').click(function (e) { 
		e.preventDefault();
		var activePopup = $(this).closest('.popup'); // РѕРїСЂРµРґРµР»СЏРµРј РєР°РєРѕР№ РїРѕРїР°Рї РЅСѓР¶РЅРѕ Р·Р°РєСЂС‹С‚СЊ
		closePopup(activePopup); // РїРµСЂРµРґР°РµРј РїР°СЂР°РјРµС‚СЂ РІ С„СѓРЅРєС†РёСЋ

		// Сѓ fixed СЌР»РµРјРµРЅС‚РѕРІ РІРѕР·РІСЂР°С‰Р°РµРј transition
		setTimeout(function(){
			$('.header-container, .search').css('transition', '');
		}, 500);
	});
	// РІ html-РєРѕРґРµ РјРѕР¶РЅРѕ Р»СЋР±РѕРјСѓ СЌР»РµРјРµРЅС‚Сѓ РІРЅСѓС‚СЂРё РїРѕРїР°РїР° РґРѕР±Р°РІРёС‚СЊ РєР»Р°СЃСЃ .popup-close Рё РїРѕ РєР»РёРєСѓ Р±СѓРґРµС‚ Р·Р°РєСЂС‹РІР°С‚СЊСЃСЏ СЌС‚РѕС‚ РїРѕРїР°Рї
	// РІС‹Р·РІР°С‚СЊ РїРѕРїР°Рї РёР· js РјРѕР¶РЅРѕ С‚Р°Рє: openPopup('#popup1');
	// Р·Р°РєСЂС‹С‚СЊ РїРѕРїР°Рї РёР· js РјРѕР¶РЅРѕ С‚Р°Рє: closePopup('#popup1');


    if ($('.partners__list .partners__logo').length > 1) {
        var partnersSlider = $('.partners__list').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            dots: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                }
            ],
        });

        $('.section.partners').on('mouseover', function() {
            $('.partners__list').slick('slickPlay');
        });
        $('.section.partners').on('mouseleave', function() {
            $('.partners__list').slick('slickPause');
        })
    }

});