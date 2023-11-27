"use strict"

export {requestData};

const requestData = getRequestData();

function getRequestData() {
    let formData = {};
    formData.requestForm = document.querySelector('.request-form');
    formData.flightInp = document.querySelector('#flightNo');
    formData.pickUpPlace = document.querySelector('#pickUpPlace');
    formData.dropOffPlace = document.querySelector('#dropOffPlace');
    formData.guestsNo = document.querySelector('#guestsQnt');
    formData.pickUpSign = document.querySelector('#pickUpSign');
    formData.email = document.querySelector('#guestEmail');
    formData.tel = document.querySelector('#guestTel');
    formData.comments = document.querySelector('#comments');

    return formData;
}