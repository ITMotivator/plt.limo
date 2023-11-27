"use strict";

export { showTerms };

function showTerms(elem) {
    let termsList = elem.querySelector('.services_terms');

    if (!elem.open) {
        termsList.classList.add('swing-in-top-fwd');
        termsList.onanimationend = () => {
            termsList.classList.remove('swing-in-top-fwd');
        }
    }
}