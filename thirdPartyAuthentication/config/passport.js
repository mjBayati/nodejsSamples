var localStrategy = require('passport-local').Strategy;

var db = require('../models');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.uuid);
    }); 
    passport.deserializeUser(function(uuid, done){
        db.accounts.findById(uuid).then(function(user){
            if(user){
                done(null, user.get());
            }
            else{
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'account_key',
        passReqToCallback: true
    },
    function(req, email, account_key, done){
        process.nextTick(function(){
            db.accounts.findOne({
                where:{ email: email}
            }).then(function(user, err){
                if(err)
                    return done(err);
                
                if(user){
                    console.log('this email is already signed up');
                    return done(null, false, req.flash('this email is already taken'));
                }else{
                    db.accounts.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        city: req.body.city,
                        state: req.body.state,
                        email: req.body.email,
                        phone: req.body.phone,
                        account_key: db.accounts.generateHash(account_key)
                    }).then((dbUser)=> {
                        return done(null. dbUser);
                    }).catch((err) => {
                        console.log('db error: ',err);
                    });
                }
            });
        });
    }
    ));

    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'account_key',
        passReqToCallback: true
        },
        function(req, email, account_key, done){
            db.accounts.findOne({
                where: {email: req.body.email}
            }).then(function(user, error){
                if(!user){
                    console.log('login error: no such user found');
                    return done(null, false, req.flash('No such user found'));
                }
                if(user && !user.validPassword(req.body.account_key)){
                    return done(null, false, req.flash('wrong password'));
                }
                return done(null, user);
            });
        }
    ));
};

