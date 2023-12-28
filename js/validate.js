"use strict"

export { validateRequest };

import { timeData } from "../js/main.js";
import { setDate } from "../js/date.js";

function validateRequest(dataObject, requestData) {
    if (checkServiceTime() && checkPassengersNo() && checkFlightAndLocations() && checkContacts()) {
        return true;
    }
    return false

    function checkServiceTime() {
        let bookedDay = +timeData.day.value,
            bookedMonth = +timeData.month.value,
            bookedYear = +timeData.year.value,
            bookedHours = +timeData.time.value.slice(0, 2),
            bookedMins = +timeData.time.value.slice(3);

        let bookedDate = new Date(bookedYear, bookedMonth, bookedDay, bookedHours, bookedMins);

        if (bookedDate < timeData.setDate) {
            alert("Sorry, we can not provide service at requested time");
            setDate();
            return false;
        } else {
            dataObject.serviceDateAndTime = `${bookedDay}/${bookedMonth + 1}/${bookedYear} at ${timeData.time.value}`;
            console.log(`Service date: ${dataObject.serviceDateAndTime}`);
            return true;
        }
    }

    function checkPassengersNo() {
        if (requestData.guestsNo.value && (requestData.guestsNo.value <= dataObject.carMaxCap)) {
            dataObject.passengers = requestData.guestsNo.value;
            console.log(dataObject);
            return true;
        }
        return false;
    }

    function checkFlightAndLocations() {
        if (dataObject.pickUpPlace == 'airport') {
            if (requestData.flightInp.value && requestData.dropOffPlace.value) {
                dataObject.flightNo = requestData.flightInp.value;
                dataObject.pickUpLocation = 'N/A';
                dataObject.dropOffLocation = requestData.dropOffPlace.value;
                return true
            }
            else return false
        } else if (dataObject.dropOffPlace == 'airport') {
            if (requestData.flightInp.value && requestData.pickUpPlace.value) {
                dataObject.flightNo = requestData.flightInp.value;
                dataObject.pickUpLocation = requestData.pickUpPlace.value;
                dataObject.dropOffLocation = 'N/A';
                return true
            } else return false
        } else {
            if (requestData.pickUpPlace.value && requestData.dropOffPlace.value) {
                dataObject.pickUpLocation = requestData.pickUpPlace.value;
                dataObject.dropOffLocation = requestData.dropOffPlace.value;
                dataObject.flightNo = "N/A";
                return true
            }
            else return false
        }
    }

    function checkContacts() {
        if (requestData.pickUpSign.value && requestData.email.value && requestData.tel.value) {
            dataObject.pickUpSign = requestData.pickUpSign.value;
            dataObject.email = requestData.email.value;
            dataObject.tel = requestData.tel.value;
            if (requestData.comments.value) {
                dataObject.comments = requestData.comments.value;
            } else {
                dataObject.comments = 'N/A';
            }
            return true;
        }
        return false
    }
}