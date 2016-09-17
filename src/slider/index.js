function initSliders(event){
    var sliders = document.querySelectorAll('.slider-container');
    sliders.forEach(initSlider);
}

function initSlider(slider){
    //slider settings
    var elementsOnSlide = slider.getAttribute('data-elements-on-slide');
    var autoplayLoop = slider.getAttribute('data-autoplay-loop');
    var autoplayDelay = slider.getAttribute('data-autoplay-delay');
    var elementWidth  = slider.getBoundingClientRect().width / elementsOnSlide;
    var elements = slider.querySelectorAll('.repeater-item-wrapper');
    var autoplay = slider.getAttribute('data-autoplay') && elements.length / elementsOnSlide > 1;

    var timeout = false;

    //set slider elements width
    elements.forEach(function(element){
        var style = window.getComputedStyle(element, null);
        element.style.width = (elementWidth)+'px';
    });

    var sliderElement = slider.querySelector('.slider');
    sliderElement.style.width = (elementWidth) * (elements.length)+'px';

    var slide = 0;
    var count = Math.ceil(elements.length / elementsOnSlide);

    slider.classList.add('first-slide');
    if(elements.length / elementsOnSlide <= 1){
        slider.classList.add('last-slide');
    }

    //create autoplay function with looper
    var loop = false;
    function _autoplay(){
        clearTimeout(timeout);
        if(loop){
            return false;
        }
        if(slide < count-1){
            timeout = setTimeout(function(){
                rightArrow.click();
                _autoplay();
            },1000*autoplayDelay);
            return true;
        }
        if(slide == count-1 && autoplayLoop){
            timeout = setTimeout(function(){
                sliderElement.style.transform = 'translateX(0px)';
                slider.classList.add('first-slide');
                slider.classList.remove('last-slide');
                slide = 0;
                _autoplay();
            },1000*autoplayDelay);
            return true;
        }
        if(slide == count-1 && !autoplayLoop){
            clearTimeout(timeout);
            loop = true;
            return true;
        }

    }

    var leftArrow = slider.querySelector('.slider-arrow-left');
    var rightArrow = slider.querySelector('.slider-arrow-right');
    //set arrows click func
    leftArrow.addEventListener('click',function(event){
        if(slide > 0){
            slide--;
            sliderElement.style.transform = 'translateX('+ -(elementWidth) * (slide) * (elementsOnSlide)+'px)';
            slider.classList.remove('last-slide');
        }
        if(slide == 0){
            slider.classList.add('first-slide');
        }
        if(autoplay && !loop){
            _autoplay();
        }
    });
    rightArrow.addEventListener('click',function(event){
        if(slide < count-1){
            slide++;
            sliderElement.style.transform = 'translateX('+ -(elementWidth) * (slide) * (elementsOnSlide)+'px)';
            slider.classList.remove('first-slide');
        }
        if(slide == count-1){
            slider.classList.add('last-slide');
        }
        if(autoplay && !loop){
            _autoplay();
        }
    });

    //init autoplay
    if(autoplay){
        _autoplay();
    }
}

document.addEventListener('DOMContentLoaded',initSliders);
