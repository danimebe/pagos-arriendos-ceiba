
const { Payment } = require('../mysql/mysql');
const moment = require('moment');

const { RENTAL_COST } = require('../utils/consts');

const createPayment = async (payment) => {
    const { documentoIdentificacionArrendatario, codigoInmueble, valorPagado } = payment;

    const paymentToUpdate = await Payment.findOne({ where: { documentoIdentificacionArrendatario, codigoInmueble } });

    if (paymentToUpdate) {
        const totalPaymentValue = Number(paymentToUpdate.valorPagado) + Number(valorPagado);
        if (paymentToUpdate.valorPagado >= 1000000) {
            throw new Error('Tu arriendo ya ha sido pagado');
        } else if (totalPaymentValue > RENTAL_COST) {
            throw new Error(`Ya habías pagado: $${paymentToUpdate.valorPagado} el valor total no puede superar ${RENTAL_COST}`);
        } else {
            paymentToUpdate.update({ valorPagado: totalPaymentValue }, {
                where: {
                    documentoIdentificacionArrendatario,
                    codigoInmueble
                }
            });

            let paymentValueDiff = Number(RENTAL_COST - paymentToUpdate.valorPagado);

            let message = paymentValueDiff !== 0 ?
                `Gracias por tu abono, sin embargo recuerda que te hace falta pagar ${paymentValueDiff}` :
                'Gracias por pagar todo tu arriendo';

            return message;
        }
    }

    const newPayment = await Payment.create(payment);

    if (!newPayment) throw new Error('Error getting payments');

    let paymentValueDiff = Number(RENTAL_COST - newPayment.valorPagado);

    let message = paymentValueDiff !== 0 ?
        `Gracias por tu abono, sin embargo recuerda que te hace falta pagar ${paymentValueDiff}` :
        'Gracias por pagar todo tu arriendo';

    return message;
}

const getPayments = async () => {

    let payments = await Payment.findAll({
        attributes: ['documentoIdentificacionArrendatario', 'codigoInmueble', 'fechaPago', 'valorPagado']
    });

    if (!payments) throw new Error('Error getting payments');

    // Cambiar formato de fecha a dd/mm/yyyy
    payments.pagos = payments.map(row => {
        const payment = row.get();
        payment.fechaPago = moment(payments.fechaPago).format('DD/MM/YYYY');
    })

    return payments;

}

module.exports = {
    getPayments,
    createPayment
}