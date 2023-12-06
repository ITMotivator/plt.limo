"use strict";

import { showTerms } from "../js/showTerms.js";

let servicesDetails = document.querySelectorAll('.services details');

for (let details of servicesDetails) {
    details.addEventListener('click', function () {
        showTerms(details);
    });
}