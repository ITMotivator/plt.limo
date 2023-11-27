"use strict";

import { slider } from "../js/slider.js";
import { Email } from "../js/smtp.js";
import { mainFunction } from "../js/rsvn.js";
import { setDate } from "../js/date.js";
import { requestData } from "../js/requestData.js";
import { openMenu } from "../js/openMenu.js";
import { showCarsGallery } from "../js/carsGallery.js";

let timeData = setDate();

export { timeData };

window.addEventListener('DOMContentLoaded', function () {
    slider();

    mainFunction(Email, requestData);

    openMenu();

    showCarsGallery();

});





