var express = require('express');
var router = express.Router();
var mongoose = require('../admin/mongoConnect.js');
var userModel = require('./models/users');
var verificatonModel = require('./models/verification');
var nodemailer = require('nodemailer'); 
var Recaptcha = require('re-captcha');
var keys = require('../admin/keys');
var recaptcha = new Recaptcha(keys.PUBLIC_KEY, keys.PRIVATE_KEY);
//please change this to include your email smtp server
var emailSecret = require('../admin/emailSecret2'); 

router.route('/')
    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .post(function(req, res) {
        //userModel.find({ $or: [{name:res.body.name}, {email:res.body.email}]}, function(err, user){
        userModel.findOne({name:req.body.name}, function(err, user){
            if(err){
                console.log(err);
                res.send({signup: false, message: "An error has occurred. Please try again."});
            }

            if(user){
                res.send({signup: false, message: "Please try a different email or username."});
                res.end();
            } else {
                userModel.findOne({email:req.body.email}, function(err, user){
                    if(err){
                        console.log(err);
                        res.send({signup: false, message: "An error has occurred. Please try again."});
                    }

                    if(user){
                        res.send({signup: false, message: "Please try a different email or username."});
                        res.end();
                    } else {
                        verifyUser();
                    }
                });
            }
        });

        

        function verifyUser(){
            var verifyToken = Math.random().toString(36).substring(7);

            var newUser = new userModel({
                'name':req.body.name,
                'password':req.body.password,
                'email':req.body.email
            });

            var newVerification = new verificatonModel({
                'name':req.body.name,
                'token': verifyToken
            });

            var transporter = nodemailer.createTransport(emailSecret);

            var mailOptions = {
                from: "ClaimBook Verify",
                to: req.body.email,
                subject: "Welcome to ClaimBook",
                html: "<a href='http://localhost:3000/verify?token=" + verifyToken + "'>Verify</a>"
            }

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    res.send({signup: false, message: "An error has occurred. Your email address was rejected."});
                }
                console.log('Message sent: ' + info.response);

                newVerification.save(function(err){
                    if(err){
                        console.log(err);
                        res.send({signup: false, message: "An error has occurred. Please try again."});
                    } else {
                        console.log('saved verification');
                        console.log(newVerification);
                    }
                });
            });

            newUser.save(function(err){
                if(err){
                    res.status(400).json({signup:false,message:"Sign up failed."});
                    res.end();
                }
            });

            res.status(200).json({message:"Sign up successful.", signup:true});
            res.end();
        }
    });

router.route('/captcha')
    .post(function(req,res){
        var data = {
            response:  req.body.captcha,
            challenge: req.body.challenge,
            remoteip: req.connection.remoteAddress
        };

        recaptcha.verify(data, function(err) {
            if (err) {
                console.log(err);
                res.send({captcha:false, message:"Invalid captcha. Please try again."})
            } else {
                res.send({captcha:true, message:"Valid captcha."});
            }
        });
    });

module.exports = router;
