'use strict';

var response    = require('./res');
var connection  = require('./koneksi');
var mysql       = require('mysql');

exports.index = function(req,res){
    response.ok('Aplikasi REST API Berjalan !!!', res)
}

// register capil
exports.registercapil = function(req,res){
    var data = {
        nomer_capil : req.body.nomer_capil,
        nama_capil : req.body.nama_capil,
        partai : req.body.partai,
        visi : req.body.visi,
        misi : req.body.misi,
        jab_capil : req.body.jab_capil,
        poto : req.body.poto
    }

    //cek nama capil sudah terdaftar atau belum
    var query = "SELECT nama_capil from ?? where ??=?";
    var table = ["capil", "nama_capil", data.nama_capil]
    
    query     = mysql.format(query, table);
    connection.query(query, function(error, rows){
        if(rows.length == 0){
            var query = "SELECT nomer_capil from ?? where ??=?";
            var table = ['capil', "nomer_capil", data.nomer_capil];

            query     = mysql.format(query, table);
            connection.query(query, function(error, rows){
                if(rows.length >= 2){
                    return res.status(200).send({error:true, message:'Nomer Capil digunakan'});
                }else{
                    var query = "INSERT INTO ?? SET ?";
                    var table = ['capil']

                    query     = mysql.format(query, table);
                    connection.query(query, data, function(error, rows){
                        if(error){
                            console.log(error)
                        }else{
                            response.ok("Data Capil Berhasil Ditambahkan", res);
                        }
                    })
                }
            })
        }else{
            return res.status(200).send({error:true, message:'Nama Capil Sudah Terdaftar'});
        }
    });

}


// show data pilih 
exports.showdatapilih = function(req,res){
    connection.query('SELECT data_pilih.nik, data_pilih.nomer_capil, data_pilih.date, user.domisili, user.fullname from data_pilih INNER JOIN user ON data_pilih.nik = user.nik',
    function(error, rows, field){
        if(error){
            console.log(error)
        }else{
            response.okshow(rows, res)
        }
    })
}

// show data pilgub
exports.showdatapilgub = function(req,res){
    
    connection.query("SELECT capil.nomer_capil, capil.nama_capil, capil.partai, capil.visi, capil.misi, capil.jab_capil, capil.poto from capil INNER JOIN nocapil ON capil.nomer_capil = nocapil.nomer_capil",
    function(error, rows, fields){
        // console.log(rows);
        if(error){
            console.log(error)
        }else{
            response.okcap(rows, res)
        }
    })
}
