var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
const conn = require('../koneksi');

// controller untuk registrasi

exports.register = function (req, res) {
    var post = {
        nik : req.body.nik,
        fullname : req.body.fullname,
        domisili : req.body.domisili,
        password : md5(req.body.password)
    }

    var query = "SELECT nik from ?? where ??=?";
    var table = ["user", "nik", post.nik];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query     = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error)
                    }else{
                        response.ok("Berhasil Menambahkan Data User", res);
                    }
                })
            }else{
                return res.status(200).send({error:true, message:'NIK Sudah Digunakan'});
            }
        }
    })
}

// login
exports.login = function (req,res) {
    var post = {
        password: req.body.password,
        nik: req.body.nik
    }
    var query   = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table   = ['user', 'password', md5(post.password), 'nik', post.nik];

    query       = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        }else{
            if(rows.length == 1){
                var token = jwt.sign(post, config.secret, {
                    expiresIn: 1440
                });
                id_user = rows[0].id_user;

                var data = {
                    id_user : id_user,
                    access_token: token,
                    ip_address: ip.address(),
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];
                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if(error){
                        console.log(error)
                    }else{
                        res.json({
                            success: true,
                            message: "token jwt tergenerate",
                            token: token,
                            currUser: data.id_user
                        });
                    }
                })
            }else{
                 res.json({
                     "error": true,
                     "Message": "Email atau password salah!!!"
                 });
            }
        }
    })

}

// pilih capil 
exports.pilihcapil = function(req,res){
    var data ={
        nik : req.body.nik,
        nomer_capil : req.body.nomer_capil,
        date : new Date()
    }

    // CEK NIK TEREGISTER ATAU TIDAK 
    // var query = "SELECT nik FROM ?? WEHRE ??=?";
    var query = 'SELECT nik FROM ?? WHERE ??=?';
    var table = ['user', 'nik', data.nik];
    query     = mysql.format(query, table);
    console.log(query);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        }else{
            if(rows.length == 1){
                // cek nik sudah pernah memilih atau belum 
                var query = "SELECT nik FROM ?? WHERE ??=?";
                var table = ['data_pilih', "nik", data.nik];
                query     = mysql.format(query, table);
            
            
                connection.query(query, function(error, rows){
                    if(error){
                        console.log(error)
                    }else{
                        if(rows.length == 0){
                            var query = "INSERT INTO ?? SET ?";
                            var table = ['data_pilih'];
            
                            query     = mysql.format(query, table);
                            
                            connection.query(query, data, function(error, rows){
                                if(error){
                                    console.log(error)
                                }else{
                                    response.ok('Berhasil Memilih Calon Pilgub', res);
                                }
                            })
                        }else{
                            messages = "NIK dengan "+ data.nik + " Sudah Memilih Calon Pilgub";
                            return res.status(200).send({error: true, message: messages});
                        }
                    }
                })
            }else{
                messages = "NIK dengan "+ data.nik + " Belum Teregister";
                return res.status(200).send({error: true, message: messages});
            }
        }
    })

    

}
