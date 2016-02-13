var express = require('express');
var router = express.Router();
var isAuth = require('../admin/isAuth');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req,res,next){
		isAuth(req.session, function(decoded){
			if(decoded){
				res.redirect('/profile');
			} else {
				res.render('login', {title: 'Login Page'});
			}
		});
	}
);

/* GET profile page. */
router.get('/profile', function(req,res,next){
		isAuth(req.session, function(decoded){
			if(decoded){
				res.render('profile');
			} else {
				res.redirect('/login');
			}
		});
	}
);

/* GET test page. */
/* Should be conditioned to only work in dev */
router.get('/test', function(req,res,next){
		if(process.env.NODE_ENV === 'development'){
			res.render('../app/test/unit-tests');
		} else {
			res.sendStatus(400);
		}
	}
);

module.exports = router;
