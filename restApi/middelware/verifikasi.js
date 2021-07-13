const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(roles) {
    // console.log(roles);
    return function (req,res,next) {
        var tokenWithBarrer = req.headers.authorization;
        console.log(tokenWithBarrer);
        if(tokenWithBarrer){
            var token = tokenWithBarrer.split(' ')[1];
            // verifikasi jwt
            jwt.verify(token, config.secret, function (err, decoded) {
                if(err){
                    return res.status(401).send({auth:false, message:'Token Tidak Terdaftar'});
                }else{
                    if(roles == 2){
                        req.auth = decoded,
                        next();
                    }else{
                        return res.status(401).send({auth:false, message:'Gagal Megotorisasi role anda'});
                    }
                }
            })
        }else{
            return res.status(401).send({auth:false, message:'Token Tidak Terdaftar'});
        }
    }
}
module.exports = verifikasi;