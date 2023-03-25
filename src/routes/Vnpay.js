
import { Router } from "express";
import sortObject from "sortobject";



const router = Router();

router.post('/create_payment_url', function (req, res, next) {
    console.log(req.headers['x-forwarded-for'])
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var dateFormat = require('dateformat');


    var tmnCode = 'OG4BJSNB';
    var secretKey = 'ZPTGSZUBDGKRWWSRAEPICFEUDQSOUJMO';
    var returnUrl = 'https%3A%2F%2Fvercelcom%2Fdccuong%2Fduantn2023';
    var vnpUrl
    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');

    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = "OG4BJSNB";
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = "vn";
    vnp_Params['vnp_CurrCode'] = "VND";
    vnp_Params['vnp_TxnRef'] = "1231231";
    vnp_Params['vnp_OrderInfo'] = "thanh%20toan%20dsada";
    vnp_Params['vnp_OrderType'] = "other";
    console.log(req.body, "req.body.amount")
    let amountnew = (req.body.amuont)
    vnp_Params['vnp_Amount'] = 300000;
    vnp_Params['vnp_ReturnUrl'] = "https%3A%2F%2Fdomain.vn%2FVnPayReturn";
    vnp_Params['vnp_IpAddr'] = "192.168.0.102";
    vnp_Params['vnp_CreateDate'] = "20230323212549";
    vnp_Params['vnp_ExpireDate'] = "20230323214049"

    // vnp_Amount=300000&vnp_Command=pay&vnp_CreateDate=20230323212549&vnp_CurrCode=VND&vnp_ExpireDate=20230323214049&vnp_IpAddr=192.168.0.103&vnp_Locale=vn&vnp_OrderInfo=thanh+toan+don+hang&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomain.vn%2FVnPayReturn&vnp_TmnCode=OG4BJSNB&vnp_TxnRef=1231231&vnp_Version=2.1.0
    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');

    var signData = "vnp_Amount=300000000&vnp_Command=pay&vnp_CreateDate=20230324083700&vnp_CurrCode=VND&vnp_ExpireDate=20230324214049&vnp_IpAddr=192.168.0.102&vnp_Locale=vn&vnp_OrderInfo=thanh+toan+don+hang&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fduantn2023-5eeyjqq2h-dccuong.vercel.app%2F&vnp_TmnCode=OG4BJSNB&vnp_TxnRef=123&vnp_Version=2.1.0"
    var crypto = require("crypto");
    //var signed = crypto.createHmac("sha512", secretKey).update(signData).digest("hex");
    var hmac = crypto.createHmac('sha512', "ZPTGSZUBDGKRWWSRAEPICFEUDQSOUJMO");
    //passing the data to be hashed
    var data = hmac.update(signData);
    //Creating the hmac in the required format
    var gen_hmac = data.digest('hex');
    console.log(gen_hmac, "gen_hmac")
    vnpUrl = signData + "&vnp_SecureHash=" + gen_hmac;
    console.log(vnpUrl, "vnpUrl")


    res.redirect(vnpUrl)
})

// router.get('/vnpay_ipn', function (req, res, next) {
//     var vnp_Params = req.query;
//     var secureHash = vnp_Params['vnp_SecureHash'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);

//     var secretKey = 'ZPTGSZUBDGKRWWSRAEPICFEUDQSOUJMO';
//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");     
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(new Buffer(signData)).digest("hex"); 
//     vnp_Params['vnp_SecureHash'] = signed;
//     vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });


//     if (secureHash === signed) {
//         var orderId = vnp_Params['vnp_TxnRef'];
//         var rspCode = vnp_Params['vnp_ResponseCode'];
//         //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
//         res.status(200).json({ RspCode: '00', Message: 'success' })
//     }
//     else {
//         res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
//     }
// });

// router.get('/vnpay_return', function (req, res, next) {
//     var vnp_Params = req.query;

//     var secureHash = vnp_Params['vnp_SecureHash'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);

//     var tmnCode = 'GXVW14C1';
//     var secretKey = 'ZPTGSZUBDGKRWWSRAEPICFEUDQSOUJMO';

//     var querystring = require('qs');
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

//     if (secureHash === signed) {
//         //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

//         res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
//     } else {
//         res.render('success', { code: '97' })
//     }
// });

module.exports = router;