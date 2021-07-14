const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const cors          = require('cors');
const app           = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(cors);



const whitelist  = [
    'http://localhost:8100',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080'
  ];
  
  var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
 
  // Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
  
// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
// const corsOptions = {
// origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//     callback(null, true);
//     } else {
//     callback(new Error('Origin not allowed by CORS'));
//     }
// }
// }
  
  // Enable preflight requests for all routes
//   app.options('*', cors(corsOptions));

var routes = require('./routes');
routes(app, cors(corsOptionsDelegate));

app.use('/auth',cors(corsOptionsDelegate),require('./middelware'));

app.listen(3000, () => {
    console.log('your server is running at http://localhost:3000')
});