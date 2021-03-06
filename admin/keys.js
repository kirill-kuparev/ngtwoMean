/***
   KEYS should be created with a .env file:
     jwtSecret
     emailSecret
     CAPTCHA_PUBLIC_KEY
     CAPTCHA_PRIVATE_KEY
     REMOTE_MONGO_DB

   Travis hashing for builds recommended
   `gem install travis`
   `travis encrypt jwtSecret=your secret`
   paste the return into your .travis.yml:
  `
    env:
        global:
          #jwtSecret
          - private: hash
  `
   https://github.com/travis-ci/travis.rb
***/

var express = require('express');
var app = express();
var env = app.get('env');


var keys = {
  development: {
    jwtSecret: (process.env['jwtSecret']),
    emailSecret: (process.env['emailSecret']),
    CAPTCHA_PUBLIC_KEY: (process.env['CAPTCHA_PUBLIC_KEY']),
    CAPTCHA_PRIVATE_KEY: (process.env['CAPTCHA_PRIVATE_KEY']),
    REMOTE_MONGO_DB: (process.env['REMOTE_MONGO_DB'])
  },
  production: {
    jwtSecret: (process.env['jwtSecret']),
    emailSecret: (process.env['emailSecret']),
    CAPTCHA_PUBLIC_KEY: (process.env['CAPTCHA_PUBLIC_KEY']),
    CAPTCHA_PRIVATE_KEY: (process.env['CAPTCHA_PRIVATE_KEY']),
    REMOTE_MONGO_DB: (process.env['REMOTE_MONGO_DB'])
  }
}

if(env === 'development'){
  console.log('_____________________________');
  console.log('App keys:');
  console.log(JSON.stringify(keys[env], null, 5));
  console.log('_____________________________');
}


module.exports = keys[env];
