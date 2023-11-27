"use strict";

export { showCarsGallery };

function showCarsGallery() {
    let section = document.querySelector('.cars-gallery'),
        tabs = document.getElementsByClassName('nav-item'),
        contentDivs = document.getElementsByClassName('tab-content'),
        carsImages = document.getElementsByClassName('cars-gallery_photo'),
        accorElems = document.getElementsByClassName('cars-gallery_car-name');

    section.addEventListener('click', (e) => {
        showContentDiv(e);
        if (e.target.classList.contains('cars-gallery_photo') && (screen.width >= 768)) {
            if (!e.target.classList.contains('scaled')) {
                scaleDown(carsImages);
                e.target.classList.add('scaled');
            } else {
                e.target.classList.remove('scaled');
            }
        }
    });

    function showContentDiv(e) {
        if (e.target.closest('li')) {
            scaleDown(carsImages);
            let liElem = e.target.closest('li');
            turnOffActive(tabs);
            hideContent(contentDivs);
            let index = turnOnActive(tabs, liElem);
            contentDivs[index].classList.remove('hidden');
        } else if (e.target.closest('div.cars-gallery_car-name')) {
            let accorDiv = e.target.closest('div.cars-gallery_car-name'),
                contentDiv = accorDiv.nextElementSibling;
            if (accorDiv.classList.contains('active')) {
                accorDiv.classList.remove('active');
                contentDiv.classList.add('hidden');
            } else {
                turnOffActive(accorElems);
                hideContent(contentDivs);
                let index = turnOnActive(accorElems, accorDiv);
                contentDivs[index].classList.remove('hidden');
            }
        }
    }

    function turnOnActive(collection, elem) {
        let length = collection.length;
        for (let i = 0; i < length; i++) {
            if (collection[i] == elem) {
                elem.classList.add('active');
                return i;
            }
        }
    }

    function turnOffActive(collection) {
        for (let elem of collection) {
            if (elem.classList.contains('active')) {
                elem.classList.remove('active');
                break;
            }
        }
    }

    function hideContent(collection) {
        for (let elem of collection) {
            if (!elem.classList.contains('hidden')) {
                elem.classList.add('hidden');
            }
        }
    }

    function scaleDown(collection) {
        for (let elem of collection) {
            elem.classList.remove('scaled');
        }
    }
}




