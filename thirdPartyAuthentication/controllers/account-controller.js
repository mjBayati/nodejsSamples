var db = require('../models');
var passport = require('passport');

module.exports = function(app){
    app.get('/signup', function(req, res){
        res.render('accounts');
    });
    app.get('accounts/view', function(req, res){
       if(req.isAuthenticated()){
           db.accounts.findOne({
               where: {
                   uuid: req.session.passport.user
               }
           }).then(function(dbUser){
                var user = {
                    userInfo: dbUser.dataValues,
                    id: req.session.passport.user,
                    isloggedIin: req.isAuthenticated()
                }
                res.render('view-account', user);
           });
       } 
       else{
           var user = {
               id: null,
               isloggedIin: req.isAuthenticated()
           }
           res.redirect('/');
       }
    });

    app.get('/logout', function(req, res){
        req.session.destroy(function(err){
            req.logout();
            res.clearCookie('user_sid');
            res.clearCookie('first_name');
            res.clearCookie('user_id');
            res.redirect('/');
        });
    });

    app.post('./signup', function(req, res, next){
        passport.authenticate('local-signup', function(err, user, info){
            console.log('info: ', info);
            if(err){
                console.log('passport err: ', err);
                return next(err);
            }

            if(!user){
                console.log('user errorin sign up', user);
                return res.send({success: false, message: 'authentication failed'});
            }

            req.login(user, loginErr => {
                if(loginErr){
                    console.log('login err', loginErr);
                    return next(loginErr);
                }

                console.log('redirecting...');
                res.cookie('first_name', user.first_name);
                res.cookie('user_id', user.uuid);
                return res.redirect('accounts/view');
            });
        })(req, res, next);
    });

    app.post('./login', function(req, res, next){
        passport.authenticate('local-login', function(err, user, info){
            if(err){
                console.log('passport err in login: ', err);
            }

            if(!user){
                return res.send({success: false, message: 'authentication failed'});
            }

            req.login(user, loginErr => {
                if(loginErr){
                    console.log('login err ', loginErr);
                    return next(loginErr);
                }

                console.log('redirecting...');
                res.cookie('first_name', user.first_name);
                res.cookie('user_id', user.uuid);
            
                return res.json(true);
            });
        })(req, res, next);
    });
}