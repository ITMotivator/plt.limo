"use strict"

export { setDate };

function setDate() {
    let timeData = {};
    timeData.day = document.querySelector('#serviceDay');
    timeData.month = document.querySelector('#serviceMonth');
    timeData.year = document.querySelector('#serviceYear');
    timeData.time = document.querySelector('#serviceTime');

    let today = new Date(),
        tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        console.log(today);

    let localHours = today.getUTCHours() + 7;

    if (localHours >= 18) {
        timeData.time.value = '12:00';
        timeData.day.value = tomorrow.getDate();
        timeData.month.value = tomorrow.getMonth();
        timeData.year.value = tomorrow.getFullYear();
        timeData.setDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 12);
    } else if ((localHours < 18) && (localHours > 9)) {
        let minutes = today.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        timeData.time.value = `${localHours + 3}:${minutes}`;
        timeData.day.value = today.getDate();
        timeData.month.value = today.getMonth();
        timeData.year.value = today.getFullYear();
        timeData.setDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), localHours + 3, minutes);
    } else {
        timeData.time.value = '12:00';
        timeData.day.value = today.getDate();
        timeData.month.value = today.getMonth();
        timeData.year.value = today.getFullYear();
        timeData.setDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
    }

    return timeData;
}
