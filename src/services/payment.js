const {
    RENTAL_COST,
    MIN_RENTAL_PAYMENT
} = require('../utils/consts');

const validateDateFormat = (date) => {

    // Expresión regular para válidar el formato de fecha DD/MM/YYYY
    const regEx = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!regEx.test(date)) {
        return false;
    }

    return true;
}

const validateOddDay = (date) => {

    if (date.getDate() % 2 === 0) {
        return false;
    }

    return true;
}

const validatePayment = (value) => {
    return value < MIN_RENTAL_PAYMENT || value > RENTAL_COST;
}

module.exports = {
    validateOddDay,
    validateDateFormat,
    validatePayment
}