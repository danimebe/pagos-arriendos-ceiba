const express = require('express');
const app = express();
const cors = require('cors');

var corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(require('../routes/payment.routes'));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


module.exports = app;

