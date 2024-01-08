"use strict";

export { mainFunction };

import { mainData } from "../js/data.js";
import { validateRequest } from "../js/validate.js";
import { showTerms } from "./showTerms.js";

function mainFunction(Email, requestData) {
    let trfTab = document.querySelector('.trf-tab'),
        hourlyTab = document.querySelector('.hourly-tab'),
        dropOffRow = document.querySelector('.dropoff'),
        durationRow = document.querySelector('.duration'),
        pickUpSelect = document.querySelector('#pickup'),
        pickUpWarning = document.querySelector('#pickUpWarning'),
        dropOffWarning = document.querySelector('#dropOffWarning'),
        dropOffSelect = document.querySelector('#dropoff'),
        durationSelect = document.querySelector('#duration'),
        searchBtn = document.querySelector('#search'),
        carsMenu = document.querySelector('.cars-list'),
        selectBtns = document.getElementsByClassName('selectBtn'),
        servicesDetails = document.querySelectorAll('.services details');

    let cars = Array.from(carsMenu.getElementsByClassName('car'));

    const rsvnData = {};

    trfTab.addEventListener('click', checkServiceType);
    hourlyTab.addEventListener('click', checkServiceType);

    pickUpSelect.addEventListener('change', blockLocations);
    dropOffSelect.addEventListener('change', checkIfAirport);

    pickUpSelect.addEventListener('change', changeBorderColor);
    dropOffSelect.addEventListener('change', changeBorderColor);

    searchBtn.addEventListener('click', searchCars);

    for (let details of servicesDetails) {
        details.addEventListener('click', function () {
            showTerms(details);
        });
    }

    for (let btn of selectBtns) {
        btn.addEventListener('click', function () {
            openRequestForm(btn);
        });
    }

    let requestBtn = document.querySelector('#requestBtn');

    requestBtn.addEventListener('click', function (event) {
        if (validateRequest(rsvnData, requestData)) {
            event.preventDefault();
            alert(`Your request sent! We'll get back to you shortly.\n Our website is in test mode now. Some errors may occur regarding mails delivery. If we didn't reply within 12 hours, kindly contact us via mail or messengers.`);
            sendEmail(rsvnData);
        } else {
            'Data hasnt passed validation!';
        }
    });

    function searchCars() {
        hideAllCars();
        if (checkInputs()) {
            if (rsvnData.serviceType == 'Transfer') {
                if ((pickUpSelect.value == 'airport') || (dropOffSelect.value == 'airport')) {
                    showTrfCars();
                } else {
                    showAllCars();
                }
            } else if (rsvnData.serviceType == 'Hourly') {
                if (pickUpSelect.value == 'airport') {
                    showTrfCars();
                } else {
                    showAllCars();
                }
            }
        };
    }

    function blockLocations() {
        for (let location of pickUpSelect) {
            if (location.selected == true) {
                if (location.dataset.area == 'inside') {
                    if (location.dataset.name == 'airport') {
                        dropOffSelect[0].disabled = true;
                        for (let location of dropOffSelect) {
                            location.disabled = false;
                        }
                        dropOffSelect[1].disabled = true;
                    } else {
                        for (let location of dropOffSelect) {
                            location.disabled = false;
                        }
                    }
                } else {
                    dropOffSelect[0].selected = true;
                    dropOffSelect[1].disabled = false;
                    for (let location of dropOffSelect) {
                        if (location.dataset.area == 'outside') {
                            location.disabled = true;
                        }
                    }
                }
                break;
            }
        }
    }

    function checkIfAirport() {
        if ((dropOffSelect.value == 'airport') && (!pickUpSelect[0].selected)) {
            pickUpSelect[1].disabled = true;
        } else if (dropOffSelect.value != 'airport') {
            pickUpSelect[1].disabled = false;
        }
    }

    function changeBorderColor() {
        if (pickUpSelect.value) {
            pickUpSelect.classList.remove('outlineWarning');
            pickUpWarning.classList.add('hidden');
        }
        if (dropOffSelect.value) {
            dropOffSelect.classList.remove('outlineWarning');
            dropOffWarning.classList.add('hidden');
        }
    }

    function checkServiceType(e) {
        hideAllCars();
        requestData.requestForm.classList.add('hidden');
        let option4hours = durationSelect.querySelector('option[value="4"]');
        if (e.target.classList.contains('trf-tab')) {
            pickUpSelect[0].selected = true;
            dropOffSelect[0].selected = true;
            showArea();
            trfTab.classList.add('srv-tab-active');
            pickUpWarning.classList.add('hidden');
            dropOffWarning.classList.add('hidden');
            pickUpSelect.classList.remove('outlineWarning');
            hourlyTab.classList.remove('srv-tab-active');
            dropOffSelect.classList.remove('outlineWarning');
            dropOffRow.classList.remove('hidden');
            durationRow.classList.add('hidden');
        }
        else if (e.target.classList.contains('hourly-tab')) {
            pickUpSelect[0].selected = true;
            blockArea();
            trfTab.classList.remove('srv-tab-active');
            pickUpWarning.classList.add('hidden');
            hourlyTab.classList.add('srv-tab-active');
            dropOffRow.classList.add('hidden');
            pickUpSelect.classList.remove('outlineWarning');
            durationRow.classList.remove('hidden');
            option4hours.selected = true;
        }

        function blockArea() {
            for (let location of pickUpSelect) {
                if (location.dataset.area == 'outside') {
                    location.disabled = true;
                }
            }
        }

        function showArea() {
            for (let location of pickUpSelect) {
                if (location.dataset.area == 'outside') {
                    location.disabled = false;
                }
            }
        }
    }

    function checkInputs() {
        if (trfTab.classList.contains('srv-tab-active')) {
            if ((pickUpSelect.selectedIndex == 0) || (dropOffSelect.selectedIndex == 0)) {
                if (pickUpSelect.selectedIndex == 0) {
                    pickUpSelect.classList.add('outlineWarning');
                    pickUpWarning.classList.remove('hidden');
                } else {
                    pickUpSelect.classList.remove('outlineWarning');
                    pickUpWarning.classList.add('hidden');
                }
                if (dropOffSelect.selectedIndex == 0) {
                    dropOffSelect.classList.add('outlineWarning');
                    dropOffWarning.classList.remove('hidden');
                } else {
                    dropOffSelect.classList.remove('outlineWarning');
                    dropOffWarning.classList.add('hidden');
                }
                return false;
            }
            else {
                rsvnData.serviceType = 'Transfer';
                rsvnData.pickUpPlace = pickUpSelect.value;
                rsvnData.dropOffPlace = dropOffSelect.value;
                rsvnData.serviceDuration = 'N/A';
                getTrfRates(rsvnData.pickUpPlace, rsvnData.dropOffPlace);
                return true;
            }

        } else if (hourlyTab.classList.contains('srv-tab-active')) {
            if (pickUpSelect.selectedIndex == 0) {
                pickUpSelect.classList.add('outlineWarning');
                pickUpWarning.classList.remove('hidden');
                return false;
            } else {
                pickUpSelect.classList.remove('outlineWarning');
                pickUpWarning.classList.add('hidden');
                rsvnData.serviceType = 'Hourly';
                rsvnData.pickUpPlace = pickUpSelect.value;
                rsvnData.dropOffPlace = 'N/A';
                rsvnData.serviceDuration = durationSelect.value;
                getHourlyRates(rsvnData.serviceDuration);
                return true;
            }
        }
    }

    function hideAllCars() {
        for (let car of cars) {
            car.classList.add('hidden');
            car.classList.remove('d-flex');
        }
        carsMenu.classList.add('hidden');
    }

    function showTrfCars() {
        for (let car of cars) {
            if (!(car.dataset.carname == 'Vito')) {
                car.classList.remove('hidden');
                car.classList.add('d-flex');
            }
        }
        carsMenu.classList.remove('hidden');
    }

    function showAllCars() {
        for (let car of cars) {
            car.classList.remove('hidden');
            car.classList.add('d-flex');
        }
        carsMenu.classList.remove('hidden');
    }

    function getTrfRates(pickUp, dropOff) {
        if (((pickUp == 'airport') || (pickUp == 'phuket')) && ((dropOff == 'airport') || (dropOff == 'phuket'))) {
            for (let car of cars) {
                let carPrice = car.querySelector('span.rate'),
                    selectBtn = car.querySelector('.selectBtn');
                carPrice.innerText = mainData.phuketRates[car.getAttribute('data-carname')];
                selectBtn.setAttribute('data-price', carPrice.innerText);
            }
        } else if (((pickUp == 'airport') || (pickUp == 'phuket')) && (dropOff == 'natai') || (pickUp == 'natai') && ((dropOff == 'airport') || (dropOff == 'phuket'))) {
            for (let car of cars) {
                let carPrice = car.querySelector('span.rate'),
                    selectBtn = car.querySelector('.selectBtn');
                carPrice.innerText = mainData.nataiRates[car.getAttribute('data-carname')];
                selectBtn.setAttribute('data-price', carPrice.innerText);
            }
        } else if (((pickUp == 'airport') || (pickUp == 'phuket')) && (dropOff == 'khaolak') || (pickUp == 'khaolak') && ((dropOff == 'airport') || (dropOff == 'phuket'))) {
            for (let car of cars) {
                let carPrice = car.querySelector('span.rate'),
                    selectBtn = car.querySelector('.selectBtn');
                carPrice.innerText = mainData.khaolakRates[car.getAttribute('data-carname')];
                selectBtn.setAttribute('data-price', carPrice.innerText);
            }
        } else if (((pickUp == 'airport') || (pickUp == 'phuket')) && (dropOff == 'krabi') || (pickUp == 'krabi') && ((dropOff == 'airport') || (dropOff == 'phuket'))) {
            for (let car of cars) {
                let carPrice = car.querySelector('span.rate'),
                    selectBtn = car.querySelector('.selectBtn');
                carPrice.innerText = mainData.krabiRates[car.getAttribute('data-carname')];
                selectBtn.setAttribute('data-price', carPrice.innerText);
            }
        }
    }

    function getHourlyRates(duration) {
        for (let car of cars) {
            let carPrice = car.querySelector('span.rate'),
                selectBtn = car.querySelector('.selectBtn');
            carPrice.innerText = mainData.hourlyRates[car.getAttribute('data-carname')] + (duration - 4) * mainData.extraHour[car.getAttribute('data-carname')];
            selectBtn.setAttribute('data-price', carPrice.innerText);
        }
    }

    function openRequestForm(button) {
        rsvnData.carName = button.dataset.carname;
        rsvnData.carPrice = button.dataset.price;
        rsvnData.carMaxCap = button.dataset.maxcap;

        requestData.guestsNo.setAttribute('max', rsvnData.carMaxCap);

        if (rsvnData.pickUpPlace == 'airport') {
            requestData.pickUpPlace.classList.add('hidden');
            requestData.pickUpPlace.required = false;
            requestData.flightInp.classList.remove('hidden');
            requestData.flightInp.required = true;
            requestData.dropOffPlace.classList.remove('hidden');
            requestData.dropOffPlace.required = true;
            rsvnData.pickUpLocation = 'N/A';
        } else if (rsvnData.dropOffPlace == 'airport') {
            requestData.flightInp.classList.remove('hidden');
            requestData.flightInp.required = true;
            requestData.pickUpPlace.classList.remove('hidden');
            requestData.pickUpPlace.required = true;
            requestData.dropOffPlace.classList.add('hidden');
            requestData.dropOffPlace.required = false;
            rsvnData.dropOffLocation = 'N/A';
        } else {
            requestData.flightInp.classList.add('hidden');
            requestData.flightInp.required = false;
            requestData.pickUpPlace.classList.remove('hidden');
            requestData.pickUpPlace.required = true;
            requestData.dropOffPlace.classList.remove('hidden');
            requestData.dropOffPlace.required = true;
            rsvnData.flightNo = 'N/A';
        }

        requestData.requestForm.classList.remove('hidden');

        for (let car of cars) {
            if (car.dataset.carname !== rsvnData.carName) {
                car.classList.remove('d-flex');
                car.classList.add('hidden');
            }
        }
    }

    function sendEmail(dataRequest) {
        Email.send({
            SecureToken: "2073aba5-3ae3-44e6-b461-b701981f1546",
            To: 'rsvn@plt.limo',
            From: "rsvn@plt.limo",
            Subject: "New booking request from website",
            Body: `
            <html>
            <h2>New request form website!</h2>
            <h4>Service details</h4>
            <p>Service type: ${dataRequest.serviceType}</p>
            <p>Duration: ${dataRequest.serviceDuration}</p>
            <p>Date & time: ${dataRequest.serviceDateAndTime}</p>
            <p>PickUp place: ${dataRequest.pickUpPlace}</p>
            <p>PickUp location: ${dataRequest.pickUpLocation}</p>
            <p>DropOff place: ${dataRequest.dropOffPlace}</p>
            <p>DropOff location: ${dataRequest.dropOffLocation}</p>
            <p>Flight No: ${dataRequest.flightNo}</p>
            <p>Vehicle: ${dataRequest.carName}</p>
            <p>Passengers: ${dataRequest.passengers}</p>
            <p>Price: ${dataRequest.carPrice}</p>
            <h4>Contact details</h4>
            <p>Pickup sign: ${dataRequest.pickUpSign}</p>
            <p>Email: ${dataRequest.email}</p>
            <p>Telephone: ${dataRequest.tel}</p>
            <p>Comments: ${dataRequest.comments}</p>
            </html>`,
        })
            .then((function () {
                window.location.href = '/';  
            })());
    }
}

