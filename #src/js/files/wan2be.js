//Плавающие объекты паралакс-----------------------------------------------
document.addEventListener("mousemove" , parallax)
function parallax(e) {
	//ищем объекты которым добавим паралкс
    this.querySelectorAll('.slide__feather').forEach(feather => {
    	//берем дата атрибут
        const speed = feather.getAttribute('data-speed')
        const x = (window.innerWidth - e.pageX*speed)/100
        const y = (window.innerWidth - e.pageY*speed)/100
        feather.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}
//-----------------------------------------------------------------------------------------------------
//Сылки якори
$(document).ready(function () {
    $('a[href^="#"]').click(function(){
      var target = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 300)
    });
  }); 

//-----------------------------------------------------------------------------------------------------
  //прилипающая шапка
  const navOffset = $('.header').offset().top;
        $(window).scroll(function (){
          const scrolled = $(this).scrollTop();

            if (scrolled > navOffset) {
              $('.wrapper').addClass('nav-fixed');
            }
            else if (scrolled < navOffset){
              $('.wrapper').removeClass('nav-fixed');
            }
        });  

//-----------------------------------------------------------------------------------------------------
        //скролл анимация
        const animItems = document.querySelectorAll('._anim-items');
        if (animItems.length > 0) {
          window.addEventListener('scroll', animOnScroll);
          function animOnScroll(params) {
            for (let i = 0; i < animItems.length; i++){
              const animItem = animItems[i];
              const animItemHeight = animItem.offsetHeight;
              const animItemOffset = offset(animItem).top;
              const animStart = 100;

              let animItemPoint = window.innerHeight - animItemHeight / animStart;
              if (animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
              }
              if((pageYOffset > animItemOffset - animItemPoint)){
                animItem.classList.add('_active');
              }
              else{
                
                animItem.classList.remove('_active');
              }


            }
          }
          function offset(el){
            const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left +scrollLeft}
          }
        }  


        //обычный бургер
        $('.burger__inner').on('click', function(){
			$('.header__menu').toggleClass('header__menu--active')
			$('.burger').toggleClass('burger--active')
		$('.header__inner').toggleClass('header__inner--active')
		$('body').toggleClass('body--active')
		});
	  

		//закрытие меню при клике на ссылку
	  $('.menu-list__item').on('click', function(){
		$('.header__inner').removeClass('header__inner--active')
		$('body').removeClass('body--active')
		$('.burger').removeClass('burger--active')
	  });




//-----------------------------------------------------------------------------------------------------
        //ПОЛНОЭКРАННЫЙ СКРОЛЛ 
        let wrapper = document.querySelector('.wrapper');

let pageSlider = new Swiper('.page', {
	// Свои классы
	wrapperClass: "page__wrapper",
	slideClass: "page__screen",

	// Вертикальный слайдер
	direction: 'vertical',

	// Количество слайдов для показа
	slidesPerView: 'auto',

	// Включаем параллакс
	parallax: true,


	// Управление клавиатурой
	keyboard: {
		// Включить\выключить
		enabled: true,
		// Включить\выключить
		// только когда слайдер
		// в пределах вьюпорта
		onlyInViewport: true,
		// Включить\выключить
		// управление клавишами
		// pageUp, pageDown
		pageUpDown: true,
	},

	// Управление колесом мыши
	mousewheel: {
		// Чувствительность колеса мыши
		sensitivity: 1,
		// Класс объекта на котором
		// будет срабатывать прокрутка мышью.
		//eventsTarget: ".image-slider"
	},

	// Отключение функционала
	// если слайдов меньше чем нужно
	watchOverflow: true,

	// Скорость
	speed: 800,

	// Обновить свайпер
	// при изменении элементов слайдера
	observer: true,

	// Обновить свайпер
	// при изменении родительских
	// элементов слайдера
	observeParents: true,

	// Обновить свайпер
	// при изменении дочерних
	// элементов слайда
	observeSlideChildren: true,

	// Навигация 
	// Буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: "page__bullet",
		bulletActiveClass: "page__bullet_active",
	},
	// Скролл
	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",
		// Возможность перетаскивать скролл
		draggable: true
	},

	// Отключаем автоинициализацию
	init: false,

	// События
	on: {
		// Событие инициализации
		init: function () {
			menuSlider();
			setScrollType();
			wrapper.classList.add('_loaded');
		},
		// Событие смены слайда
		slideChange: function () {
			menuSliderRemove();
			menuLinks[pageSlider.realIndex].classList.add('_active');
		},
		resize: function () {
			setScrollType();
		}
	},
});

let menuLinks = document.querySelectorAll('.menu__link');

function menuSlider() {
	if (menuLinks.length > 0) {
		menuLinks[pageSlider.realIndex].classList.add('_active');
		for (let index = 0; index < menuLinks.length; index++) {
			const menuLink = menuLinks[index];
			menuLink.addEventListener("click", function (e) {
				menuSliderRemove();
				pageSlider.slideTo(index, 800);
				menuLink.classList.add('_active');
				e.preventDefault();
			});
		}
	}
}

function menuSliderRemove() {
	let menuLinkActive = document.querySelector('.menu__link._active');
	if (menuLinkActive) {
		menuLinkActive.classList.remove('_active');
	}
}

function setScrollType() {
	if (wrapper.classList.contains('_free')) {
		wrapper.classList.remove('_free');
		pageSlider.params.freeMode = false;
	}
	for (let index = 0; index < pageSlider.slides.length; index++) {
		const pageSlide = pageSlider.slides[index];
		const pageSlideContent = pageSlide.querySelector('.screen__content');
		if (pageSlideContent) {
			const pageSlideContentHeight = pageSlideContent.offsetHeight;
			if (pageSlideContentHeight > window.innerHeight) {
				wrapper.classList.add('_free');
				pageSlider.params.freeMode = true;
				break;
			}
		}
	}
}

pageSlider.init();


//-----------------------------------------------------------------------------------------------------
//Простые спойлеры 
$(document).ready(function() {
	$('.spoiler').click(function(event) {
		if($('.spoiler').hasClass('one')){
			$('.spoiler').not($(this)).removeClass('active');
			$('ul').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});
});
//при наведении выезжает подсписок (телефон/компьютер)
if (isMobile.any()) {
    let catalogParents = document.querySelectorAll('.catalog__parent');
    for (let index = 0; index < catalogParents.length; index++) {
        const catalogParent = catalogParents[index];
        catalogParent.addEventListener("click", function(e) {
            catalogParent.classList.toggle('_active')
        });
    }
    let submenuLinks =document.querySelectorAll('.catalog__parent .catalog__link');
    for (let index = 0; index < submenuLinks.length; index++) {
        const submenuLink = submenuLinks[index];
        submenuLink.addEventListener("click", function(e) {
            e.preventDefault();
            
        });
    }  
}
else{
    let catalogParents = document.querySelectorAll('.catalog__parent');
for (let index = 0; index < catalogParents.length; index++) {
    const catalogParent = catalogParents[index];
    catalogParent.addEventListener("mouseenter", function(e) {
        catalogParent.classList.add('_active')
    });
    catalogParent.addEventListener("mouseleave", function(e) {
        catalogParent.classList.remove('_active')
    });
    
    }


    let individualsTypeofs = document.querySelectorAll('.individuals__type-of');
for (let index = 0; index < individualsTypeofs.length; index++) {
    const individualsTypeof = individualsTypeofs[index];
    individualsTypeof.addEventListener("mouseenter", function(e) {
        individualsTypeof.classList.add('_active')
    });
    individualsTypeof.addEventListener("mouseleave", function(e) {
        individualsTypeof.classList.remove('_active')
    });
    
    }
}
//--------------------------------------------------------------
//изменение класса у родителя html (телефон/компьютер)
let deleteBtns =document.querySelectorAll('.oder-item__delete-btn');
for (let index = 0; index < deleteBtns.length; index++) {
    const deleteBtn = deleteBtns[index];
    deleteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        deleteBtn.parentElement.classList.toggle('_delete')
    });
    
}
//--------------------------------------------------------------
//дополнительный способ добавлять класс родителю у нажатого таргета
window.onload = function () {
    document.addEventListener("click", documentActions);
    // Actions (делегирование события click)
    function documentActions(e) {
        const targetElement = e.target;
        if(window.innerWidth > 768 && isMobile.any()) {
            if(targetElement.classList.contains('menu__arrow')){
                targetElement.closest('li').classList.toggle('_hover');
            }
            //закрытие подменю при клике на пустое просстранство
            if(!targetElement.closest('li') && document.querySelectorAll('li._hover').length > 0){
                _removeClasses(document.querySelectorAll('li._hover'), "_hover")
            }
        }
        //--------------------------------
        //добавление класса 
        if(targetElement.classList.contains('search-form__icon')){
            document.querySelector('.search-form').classList.toggle('_active');
        }
    }
}
//-------------------------------------------------------
//слайд вниз 
let slBtn = document.querySelector('.page-category__slide-btn');
let formCategory = document.querySelector('.page-category__form');
setListener(slBtn, 'click', function(e) {
    _slideToggle(formCategory);
});
