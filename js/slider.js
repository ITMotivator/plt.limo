"use strict";

export { slider };

function slider() {
    let sliders = Array.from(document.getElementsByClassName('carousel-item')),
        nextBtn = document.querySelector('#slider-next'),
        prevBtn = document.querySelector('#slider-prev');

    let size = sliders.length;

    nextBtn.addEventListener('click', nextSlider);
    prevBtn.addEventListener('click', prevSlider);

    function nextSlider() {
        let activeInd = getActiveSlideInd();
        if (activeInd == (size - 1)) {
            sliders[activeInd].classList.remove('active');
            sliders[0].classList.add('active');
        } else {
            sliders[activeInd].classList.remove('active');
            sliders[activeInd + 1].classList.add('active');
        }
    }

    function prevSlider() {
        let activeInd = getActiveSlideInd();
        if (activeInd == 0) {
            sliders[activeInd].classList.remove('active');
            sliders[size - 1].classList.add('active');
        } else {
            sliders[activeInd].classList.remove('active');
            sliders[activeInd - 1].classList.add('active');
        }
    }

    function getActiveSlideInd() {
        for (let i = 0; i < size; i++) {
            if (sliders[i].classList.contains('active')) return i;
        }
    }
}

