'use strict';

module.exports = function(app){
    var jsonku = require('./controller');
    app.route('/')
    .get(jsonku.index);

    // app.route('/')
    // .get(jsonku.datapilih);

    app.route('/register-capil')
    .post(jsonku.registercapil);

    app.route('/showdatapilih')
    .get(jsonku.showdatapilih)

    app.route('/showdatapilgub')
    .get(jsonku.showdatapilgub)
}
