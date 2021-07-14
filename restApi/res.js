'use strict';

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values':values
    }
     res.json(data);
     res.end();
}

exports.okshow = function(values, res){
    let group = values.reduce((r,a)=>{
        r[a.nomer_capil] = [...r[a.nomer_capil] || [], a];
        return r;
    }, {})
    var data = {
        'status': 200,
        'values':group
    }
    res.json(data);
    res.end();   
}

exports.okcap = function(values, res){
    let group = values.reduce((r,a) =>{
        r[a.nomer_capil] = [...r[a.nomer_capil] || [], a];
        return r;
    }, {})
    var data = {
        'status': 200,
        'values':group
    }
    res.json(data);
    res.end();
}