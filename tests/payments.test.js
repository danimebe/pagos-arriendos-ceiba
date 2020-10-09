const {
    validateOddDay,
    validateDateFormat,
    validatePayment
} = require('../src/services/payment');


describe('Business logic tests', () => {

    it('SUCESS - Validate date format dd/mm/yyyy and date exists', () => {
        const res = validateDateFormat("25/10/2020");
        expect(res).toEqual(true);
    });

    it('UNSUCESS - Validate date format dd/mm/yyyy', () => {
        const res = validateDateFormat("25-10-2020");
        expect(res).toEqual(false);
    })

    // Si el monto es incorrecto debe devolver false
    it('SUCESS - Validate incorrect payment amount', () => {
        const res = validatePayment(1500000);
        expect(res).toEqual(true);
    })

    it('UNSUCESS - Validate incorrect payment amount', () => {
        const res = validatePayment(500000);
        expect(res).toEqual(false);
    })

    it('Sucess - Validate odd day', () => {
        const res = validateOddDay(new Date(2020, 9, 5));
        expect(res).toEqual(true);
    })

    it('UNSUCESS - Validate odd day', () => {
        const res = validateOddDay(new Date(2020, 9, 6));
        expect(res).toEqual(false);
    })

    it("UNSUCESS - Validate date doesn't exist", () => {
        const res = validateDateFormat("25/28/1995");
        expect(res).toEqual(false);
    })



})