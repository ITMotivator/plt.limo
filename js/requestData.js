"use strict"

export {requestData};

const requestData = getRequestData();

function getRequestData() {
    let formData = {};
    formData.requestForm = document.querySelector('.booking_form');
    formData.flightInp = requestForm.querySelector('#flightNo');
    formData.pickUpPlace = requestForm.querySelector('#pickUpPlace');
    formData.dropOffPlace = requestForm.querySelector('#dropOffPlace');
    formData.guestsNo = requestForm.querySelector('#guestsQnt');
    formData.pickUpSign = requestForm.querySelector('#pickUpSign');
    formData.email = requestForm.querySelector('#guestEmail');
    formData.tel = requestForm.querySelector('#guestTel');
    formData.comments = requestForm.querySelector('#comments');

    return formData;
}