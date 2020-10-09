const { Sequelize } = require('sequelize');
const PaymentModel = require('../models/payment.model');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});

const Payment = PaymentModel(sequelize, Sequelize);

sequelize.sync({ force: false, logging: false }).then(() => {
    console.log("Database connected!!")
})


module.exports = { sequelize, Payment };