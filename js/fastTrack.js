"use strict";

import { showTerms } from "../js/showTerms.js";
import { openMenu } from "../js/openMenu.js";

window.addEventListener('DOMContentLoaded', function () {
    openMenu();

    let servicesDetails = document.querySelectorAll('.services details');

    for (let details of servicesDetails) {
        details.addEventListener('click', function () {
            showTerms(details);
        });
    }
});


