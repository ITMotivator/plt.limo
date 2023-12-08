"use strict";

export { openMenu };

function openMenu() {
    let nav = document.querySelector('.navpanel'),
        contacts = nav.querySelector('.header_contacts'),
        contactsList = nav.querySelector('.navpanel_contacts'),
        menu = nav.querySelector('.header_menu'),
        menuList = nav.querySelector('.navpanel_menu');

    nav.addEventListener('click', showMenu);

    function showMenu(e) {
        if (e.target.classList.contains('header_contacts') || e.target.classList.contains('fa-contacts')) {
            contacts.classList.toggle('opened');
            contactsList.classList.toggle('opened');
        } else if (e.target.classList.contains('header_menu') || e.target.classList.contains('fa-menu')) {
            menu.classList.toggle('opened');
            menuList.classList.toggle('opened');
        }
    }
}