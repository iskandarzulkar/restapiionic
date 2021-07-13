const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const app           = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


var routes = require('./routes');
routes(app);

app.listen(3000, () => {
    console.log('your server is running at http://localhost:3000')
});