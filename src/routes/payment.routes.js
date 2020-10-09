const express = require('express');
const { validateDate, validatePaymentValue } = require('../middlewares/payment.middleware');
const { getPayments, createPayment } = require('../controllers/payment.controller');

const app = express();

const { Payment } = require('../mysql/mysql');

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la plataforma de pagos' });
})

app.get('/api/pagos', async (req, res) => {
    try {
        const payments = await getPayments();
        res.status(200).json(payments);
    } catch (error) {
        res.status(400).json({
            respuesta: error.message
        })
    }
})

app.post('/api/pagos', [validateDate, validatePaymentValue], async (req, res) => {

    try {
        const message = await createPayment(req.body);

        return res.status(201).json({
            respuesta: message
        });

    } catch (error) {
        return res.status(400).json({
            respuesta: error.message
        })
    }
});

module.exports = app;
