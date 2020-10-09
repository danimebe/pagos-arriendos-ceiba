const moment = require('moment');
const {
    validateDateFormat,
    validateOddDay,
    validatePayment
} = require('../services/payment');

const validateDate = (req, res, next) => {
    const { fechaPago } = req.body;

    if (!validateDateFormat(fechaPago)) {
        return res.status(400).json({
            respuesta: 'Debe ingresar una fecha válida en formato DD/MM/YYYY'
        })
    }
    const splitedDate = fechaPago.split('/').map(data => Number(data));
    req.body.fechaPago = moment(splitedDate.reverse()).subtract(1, 'month');

    if (!validateOddDay(req.body.fechaPago.toDate()) || !req.body.fechaPago.isValid()) {
        return res.status(400).json({
            respuesta: 'Lo siento pero no se puede recibir el pago por decreto de administración'
        })
    }

    next();
}

const validatePaymentValue = (req, res, next) => {
    const { valorPagado } = req.body;

    if (validatePayment(valorPagado)) {
        return res.status(400).json({
            respuesta: 'El valor a pagar debe estar entre 1 y 1000000'
        })
    }

    next();
}

module.exports = {
    validateDate,
    validatePaymentValue
}